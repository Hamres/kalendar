import React, {FC} from 'react';
import {Layout, Menu, Row, theme} from "antd";
import {Header} from "antd/es/layout/layout";
import {useNavigate} from 'react-router-dom'
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useDispatch} from "react-redux";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const navigate = useNavigate()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions()
    return (

        <Layout>
            <Header>
                <Row justify='end'>
                    {isAuth && <div style={{color: 'white'}}>{user.username}</div>}
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        {isAuth ? (
                            <Menu.Item
                            onClick={logout}
                            key={1}>
                                Выйти
                            </Menu.Item>
                        ) : (
                            <Menu.Item
                            onClick={() => navigate(RouteNames.LOGIN)}
                            key={1}>
                                Логин
                            </Menu.Item>
                            )}
                    </Menu>
                </Row>
            </Header>
        </Layout>
    );
};

export default Navbar;
