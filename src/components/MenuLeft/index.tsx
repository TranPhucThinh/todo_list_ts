import React, { useState } from "react";
import { HiMenu, HiOutlineSearch, HiOutlineStar } from "react-icons/hi";
import { LuListTodo, LuSettings, LuLogOut } from "react-icons/lu";
import { FaRegStickyNote } from "react-icons/fa";

import "./menuLeft.scss";

const MenuLeft: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(true);

  const openMenuHandler = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={openMenu ? "menu__left--open" : "menu__left--close"}>
      <div className="menu__left--header" onClick={openMenuHandler}>
        {openMenu && <p className="menu__left--title">Menu</p>}
        <HiMenu />
      </div>

      {openMenu && (
        <div className="menu__left--content">
          <div className="menu__main">
            <div className="search__tasks">
              <input
                type="text"
                className="search__tasks--input"
                placeholder="Search task"
              />
              <div className="search__tasks--logo">
                <HiOutlineSearch />
              </div>
            </div>

            <div className="menu__task">
              <p className="menu__task--title">TASKS</p>
              <div className="menu__task--options">
                <div className="option my__tasks">
                  <div className="option__icon my__tasks--icon">
                    <LuListTodo />
                  </div>
                  <p className="option__title my__tasks--title">My tasks</p>
                </div>
                <div className="option important__tasks">
                  <div className="option__icon important__tasks--icon">
                    <HiOutlineStar />
                  </div>
                  <p className="option__title important__tasks--title">
                    Important
                  </p>
                </div>
                <div className="option sticky__wall">
                  <div className="option__icon sticky__wall--icon">
                    <FaRegStickyNote />
                  </div>
                  <p className="option__title sticky__wall--title">
                    Sticky Wall
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="menu__other">
            <div className="other__option settings">
              <div className="other__option--icon">
                <LuSettings />
              </div>
              <div className="other__option--title">Settings</div>
            </div>
            <div className="other__option logout">
              <div className="other__option--icon">
                <LuLogOut />
              </div>
              <div className="other__option--title">Logout</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuLeft;
