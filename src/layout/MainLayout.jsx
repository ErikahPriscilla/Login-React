import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Drawer, Button } from "antd";

import {
  UserAddOutlined,
  UnorderedListOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function MainLayout() {

  const location = useLocation();

  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Detecta tamanho da tela
  useEffect(() => {

    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);

  const currentKey =
    location.pathname.startsWith("/listar") ||
    location.pathname.startsWith("/visualizar")
      ? "/listar"
      : "/cadastrar";

  const menuItems = [
    {
      key: "/cadastrar",
      icon: <UserAddOutlined />,
      label: <Link to="/cadastrar">Cadastrar</Link>,
    },
    {
      key: "/listar",
      icon: <UnorderedListOutlined />,
      label: <Link to="/listar">Listar</Link>,
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f7f7f7"
      }}
    >

      {/* ===== Cabeçalho ===== */}

      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 16,
        }}
      >

        {/* Logo / Título */}

        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Sistema de Cadastro
        </div>

        {/* Menu Desktop */}

        {!isMobile && (
          <Menu
            mode="horizontal"
            selectedKeys={[currentKey]}
            items={menuItems}
            style={{
              background: "transparent",
              borderBottom: "none",
              fontWeight: 500,
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        )}

        {/* Botão Mobile */}

        {isMobile && (
          <Button
            type="text"
            icon={
              <MenuOutlined
                style={{ fontSize: 22 }}
              />
            }
            onClick={() => setDrawerVisible(true)}
          />
        )}

      </Header>

      {/* ===== Menu lateral mobile ===== */}

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >

        <Menu
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
          onClick={() => setDrawerVisible(false)}
        />

      </Drawer>

      {/* ===== Conteúdo principal ===== */}

      <Content
        style={{
          padding: "24px",
          background: "#ffffff",
          margin: "24px",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >

        <Outlet />

      </Content>

      {/* ===== Rodapé ===== */}

      <Footer
        style={{
          textAlign: "center",
          background: "#f7f7f7",
          color: "#555",
        }}
      >
        Sistema de Cadastro de Pessoas ©2025
      </Footer>

    </Layout>
  );
}

export default MainLayout;