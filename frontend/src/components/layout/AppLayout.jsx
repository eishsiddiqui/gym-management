import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import classes from "./AppLayout.module.css";
import { Outlet, useNavigate } from "react-router";

const { Header, Sider, Content } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout className={classes.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard/members"]}
          onClick={(item) => navigate(item.key)}
          items={[
            {
              key: "/dashboard/members",
              icon: <UserOutlined />,
              label: "Members",
              children: [
                {
                  key: "/dashboard/members/view-members",
                  label: "View Members",
                },

                {
                  key: "/dashboard/members/view-member-attendance",
                  label: "Attendance",
                },

                {
                  key: "/dashboard/members/view-member-assessment",
                  label: "Assessment",
                },
              ],
            },
            {
              key: "/dashboard/membership",
              icon: <UserOutlined />,
              label: "Membership",
            },
            {
              key: "/dashboard/membershiptype",
              icon: <UserOutlined />,
              label: "Membership Types",
            },

            {
              key: "/dashboard/trainer",
              icon: <UserOutlined />,
              label: "Trainer",
              children: [
                {
                  key: "/dashboard/trainer/view-trainers",
                  label: "View Trainers",
                },

                {
                  key: "/dashboard/trainer/tcertifications",
                  label: "View Certifications",
                },
              ],
            },

            {
              key: "/dashboard/employee",
              icon: <UserOutlined />,
              label: "Employees",
              children: [
                {
                  key: "/dashboard/employee/view-employees",
                  label: "View Employees",
                },
                {
                  key: "/dashboard/employee/view-employees-attendance",
                  label: "Attendance",
                },

                {
                  key: "/dashboard/employee/salary",
                  label: "Salary",
                },
              ],
            },
            {
              key: "/dashboard/admin",
              icon: <UserOutlined />,
              label: "Admin",
            },
            {
              key: "/dashboard/expense",
              icon: <UserOutlined />,
              label: "Expense",
            },

            {
              key: "/dashboard/equipment",
              icon: <UserOutlined />,
              label: "Equipment",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
