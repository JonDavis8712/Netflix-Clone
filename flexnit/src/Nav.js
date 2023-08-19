import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <img
        className="nav__logo"
        src="https://lh3.googleusercontent.com/pw/AIL4fc9pi7ol2zGc5xugYP07SmRCV4hAdIUKw753Y9XwLA8HiMafmTo4wLoiW7hAGE6DhgCNA0eS2ifFQuDt8BPHx_QdKAXCgBLmvqABa4Ifv4MmzY-m6Zs=w2400"
        alt="Flexnit logo"
      />
      <img
        src="https://lh3.googleusercontent.com/pw/AIL4fc_AptWUbUuvzp6e3NzkHtEo0_enLPrVtmNRhABVC-U4_w-L61Ac3cfbwVCFEl_sHVlysR2ZKE1AL7SXJqLGC_H0r2TpZVH_O9jMAiyJPrW2Q2JkX6U=w2400"
        alt=""
        className="nav__avatar"
      />
    </div>
  );
};

export default Nav;
