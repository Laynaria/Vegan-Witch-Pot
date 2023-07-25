import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import ButtonRecipe from "@components/Button/ButtonRecipe";
import instance from "@services/instance";

import avatarImg from "@assets/icons/avatar.svg";
import hide from "@assets/icons/hide.svg";
import show from "@assets/icons/show.svg";
import editAvatar from "@assets/icons/potion.svg";
import editIcon from "@assets/icons/wand.svg";
import changeIcon from "@assets/icons/register.svg";
import disconnectIcon from "@assets/icons/login.svg";
import deleteIcon from "@assets/icons/broom.svg";

import "@components/Profile/Profile.scss";

export default function Profile() {
  const inputRef = useRef();
  const { user, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [editInfo, setEditInfo] = useState({
    email: user.email,
    username: user.username,
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState({
    img: user.is_avatar
      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/avatars/${user.id}.jpg`
      : avatarImg,
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user.id === undefined) {
        navigate("/login");
      }
      setIsLoading(false);
    }, 100);
  }, []);

  const handleEditAvatar = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      setAvatar({
        ...avatar,
        img: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();

    if (!inputRef.current.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", inputRef.current.files[0]);

    instance
      .post(`/uploads/avatars/${user.id}`, formData)
      .then(() => {
        if (!user.is_avatar) {
          // if user never had an avatar uploaded, will edit is_avatar value to true in db
          instance
            .put(`/users/edit-avatar/${user.id}`, { is_avatar: true })
            .then(() =>
              setUser({
                ...user,
                is_avatar: true,
              })
            )
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleEditInfo = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();

    const { email, username } = editInfo;

    if (email === "" || username === "") {
      return;
    }

    // We check if email exist
    instance
      .get(`/verify-email/${editInfo.email}`)
      .then((res) => {
        if (!res.data[0] || res.data[0].id === user.id) {
          // Then we check if username exist
          instance
            .get(`/verify-username/${editInfo.username}`)
            .then((result) => {
              if (!result.data[0] || result.data[0].id === user.id) {
                // If none exist, then we create a new user
                instance
                  .put(`/users/${user.id}`, editInfo)
                  .then(() =>
                    setUser({
                      ...user,
                      email,
                      username,
                    })
                  )
                  .then(() =>
                    setEditInfo({
                      email: editInfo.email,
                      username: editInfo.username,
                      password: "",
                      confirmPassword: "",
                    })
                  );
              } else {
                console.error("Username already exist");
              }
            })
            .catch((err) => console.error(err));
        } else {
          console.error("Email already exist");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = editInfo;

    if (password !== confirmPassword) {
      return;
    }

    if (password === "" || confirmPassword === "") {
      return;
    }

    instance
      .put(`/users/edit-password/${user.id}`, editInfo)
      .then(() =>
        setEditInfo({
          email: user.email,
          username: user.username,
          password: "",
          confirmPassword: "",
        })
      )
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDisconnect = (e) => {
    e.preventDefault();

    instance
      .post("/logout")
      .then(localStorage.removeItem("token"))
      .then(() => setUser({}))
      .then(() => navigate("/"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    // First we get the recipe_ingredient_quantity ids needed for deleting all users info
    const recipeIngredientQuantityIds = [];

    instance
      .get(`/users/delete-info/${user.id}`)
      .then((res) =>
        res.data.forEach((el) => {
          recipeIngredientQuantityIds.push(el.recipe_ingredient_quantity_id);
        })
      )
      // We can now delete entries from the joint table using the array
      .then(() => {
        if (recipeIngredientQuantityIds.length !== 0) {
          instance
            .delete("/recipe/delete-info/", {
              data: { arr: recipeIngredientQuantityIds },
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      // Now we delete all recipes based on user ID
      .then(() =>
        instance.delete(`/users/recipes/${user.id}`).catch((err) => {
          console.error(err);
        })
      )
      // And finally we delete user
      .then(() =>
        instance.delete(`/users/${user.id}`).catch((err) => {
          console.error(err);
        })
      )
      .then(() =>
        instance
          .post("/logout")
          .catch(() => console.warn("Une erreur est survenue!"))
      )
      .then(localStorage.removeItem("token"))
      .then(() => setUser({}))
      .then(() => navigate("/"))
      .catch(() => console.warn("Une erreur est survenue!"));
  };

  return (
    <section className={isLoading ? "hide" : "Profile"}>
      <h1>Profile</h1>

      <form className="AvatarForm" method="post" encType="multipart/form-data">
        <label>
          <img className="Avatar" src={avatar.img} alt="avatar" />
          <input
            type="file"
            name="img"
            accept="image/png, image/jpeg"
            onChange={handleEditAvatar}
            ref={inputRef}
          />
        </label>
        <ButtonRecipe
          icon={editAvatar}
          text="Upload"
          handleClick={handleSubmitAvatar}
        />
      </form>

      <form>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={editInfo.email}
            onChange={handleEditInfo}
          />
        </label>

        <label>
          <input
            type="name"
            name="username"
            placeholder="Username*"
            value={editInfo.username}
            onChange={handleEditInfo}
          />
        </label>
      </form>

      <ButtonRecipe
        icon={editIcon}
        text="Edit"
        handleClick={handleSubmitInfo}
        hassPopUp
        textValidation="change your informations"
      />

      <form>
        <label>
          <input
            type={isShown ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={editInfo.password}
            onChange={handleEditInfo}
          />
        </label>

        <label>
          <input
            type={isShown ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password*"
            value={editInfo.confirmPassword}
            onChange={handleEditInfo}
          />
        </label>

        <p>
          <span onClick={() => setIsShown(!isShown)} aria-hidden="true">
            <img
              src={isShown ? hide : show}
              alt={isShown ? "hide password" : "show password"}
            />
            {isShown ? "Hide Password" : "Show Password"}
          </span>
        </p>
      </form>

      <ButtonRecipe
        icon={changeIcon}
        text="Change Password"
        handleClick={handleSubmitPassword}
        hassPopUp
        textValidation="change your password"
      />

      <ButtonRecipe
        icon={disconnectIcon}
        text="Disconnect"
        handleClick={handleDisconnect}
      />

      <ButtonRecipe
        icon={deleteIcon}
        text="Delete Account"
        handleClick={handleDeleteUser}
        hassPopUp
        textValidation="delete your account"
      />
    </section>
  );
}
