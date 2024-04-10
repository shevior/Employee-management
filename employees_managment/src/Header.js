import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <div className="header-menu">
      <Menu pointing secondary className="menu">
        <Menu.Item as={Link} to="/home">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/workers">
          <Icon name="users" />
          workers
        </Menu.Item>
        <Menu.Item as={Link} to="/workers/add">
          <Icon name="user plus" />
          add new worker
        </Menu.Item>
        <Menu.Item as={Link} to="/roles">
          <Icon name="user secret" />
          roles
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
