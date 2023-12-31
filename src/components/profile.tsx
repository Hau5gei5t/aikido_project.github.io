// @ts-nocheck
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadAvatar from "./uploadAvatar";
import {
  Flex,
  Typography,
  Form,
  Input,
  ConfigProvider,
  Button,
  Space,
  Avatar,
} from "antd";
import UserAvatar from "../assets/Avatar.png";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { updateUser } from "../services/updateUser.service";
import { getAllGroup } from "../services/Groups/getAllGroups.service";

const Profile = (params) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { Text } = Typography;
  const location = useLocation();
  const { profile } = params;
  const [groups, setGroups] = React.useState();
  const [textGroup, setTextGroup] = React.useState("");
  const [confirmedFields, setConfirmedFields] = React.useState({
    email: profile.emailConfirmed,
    phone: profile.phoneNumberConfirmed,
  });

  useEffect(() => {
    if (profile) {
      console.log(profile);

      getAllGroup(profile.id, profile.role, profile.groupCode)
        .then((res) => {
          setGroups(res);
          return res;
        })
        .then((res) => {
          if (res.length === 0) {
            setTextGroup("Нет групп");
          } else {
            if (res.length > 1) {
              setTextGroup(
                `Группы: ${res
                  .map((group) => {
                    return group.groupName;
                  })
                  .join(", ")}`
              );
            } else {
              setTextGroup(`Группа: ${res[0].groupName}`);
            }
          }
        });
    }
  }, []);

  if (!profile) {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).id == location.pathname.split("/").pop()) {
      return <>{user}</>;
    }
    return <>no data</>;
  }
  const editable = profile.id == JSON.parse(localStorage.getItem("user")!).id;

  console.log(editable);
  if (editable) {
    return (
      <>
        {isMobile ? (
          <>
            <Flex vertical align="center">
              <Flex vertical align="center">
                <UploadAvatar />
                <Text strong style={{ fontSize: 24 }}>
                  {textGroup}
                </Text>
              </Flex>
              <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
                <Form
                  name="basic"
                  style={{ width: "100%" }}
                  autoComplete="off"
                  form={form}
                  initialValues={{
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    patronymic: profile.patronymic,
                    email: profile.email,
                    birthDate: profile.birthDate,
                    phoneNumber: profile.phoneNumber,
                  }}
                >
                  <Flex vertical justify="space-around">
                    <Form.Item>
                      <Flex vertical style={{ width: "auto" }}>
                        <Text strong>Фамилия</Text>
                        <Form.Item name="lastName">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Имя</Text>
                        <Form.Item name="firstName">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Отчество</Text>
                        <Form.Item name="patronymic">
                          <Input size="large"></Input>
                        </Form.Item>
                      </Flex>
                    </Form.Item>
                    <Form.Item>
                      <Flex vertical style={{ width: "auto", height: "100%" }}>
                        <Text strong>Email</Text>
                        <Form.Item name="email">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Дата рождения</Text>
                        <Form.Item name="birthDate">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Номер телефона</Text>
                        <Form.Item name="phoneNumber">
                          <Input size="large"></Input>
                        </Form.Item>
                        {false ? (
                          <>
                            <Form.Item>
                              <Button style={{ width: "100%" }} type="primary">
                                Подтвердить
                              </Button>
                            </Form.Item>
                            <Form.Item shouldUpdate>
                              {() => (
                                <Button
                                  style={{
                                    position: "relative",
                                    top: "0",
                                    width: "100%",
                                  }}
                                  type="primary"
                                  htmlType="submit"
                                  disabled={
                                    form.getFieldsValue().firstName ===
                                      profile.firstName &&
                                    form.getFieldsValue().lastName ===
                                      profile.lastName &&
                                    form.getFieldsValue().patronymic ===
                                      profile.patronymic &&
                                    form.getFieldsValue().email ===
                                      profile.email &&
                                    form.getFieldsValue().birthDate ===
                                      profile.birthDate &&
                                    form.getFieldsValue().phoneNumber ===
                                      profile.phoneNumber
                                  }
                                >
                                  Сохранить
                                </Button>
                              )}
                            </Form.Item>
                          </>
                        ) : (
                          <>
                            <Form.Item shouldUpdate>
                              {() => (
                                <Button
                                  style={{
                                    position: "relative",
                                    top: "1rem",
                                    width: "100%",
                                  }}
                                  type="primary"
                                  htmlType="submit"
                                  disabled={
                                    form.getFieldsValue().firstName ===
                                      profile.firstName &&
                                    form.getFieldsValue().lastName ===
                                      profile.lastName &&
                                    form.getFieldsValue().patronymic ===
                                      profile.patronymic &&
                                    form.getFieldsValue().email ===
                                      profile.email &&
                                    form.getFieldsValue().birthDate ===
                                      profile.birthDate &&
                                    form.getFieldsValue().phoneNumber ===
                                      profile.phoneNumber
                                  }
                                >
                                  Сохранить
                                </Button>
                              )}
                            </Form.Item>
                          </>
                        )}
                      </Flex>
                    </Form.Item>
                  </Flex>
                </Form>
              </ConfigProvider>
            </Flex>
          </>
        ) : (
          <>
            <Flex>
              <Flex vertical align="center">
                <UploadAvatar />
                <Text strong style={{ fontSize: 24 }}>
                  {textGroup}
                </Text>
              </Flex>
              <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
                <Form
                  name="basic"
                  style={{ width: "100%" }}
                  autoComplete="off"
                  form={form}
                  onFinish={(values) => {
                    updateUser(profile.id, values);
                    navigate("/");
                  }}
                  initialValues={{
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    patronymic: profile.patronymic,
                    email: profile.email,
                    birthDate: profile.birthDate,
                    phoneNumber: profile.phoneNumber,
                  }}
                >
                  <Flex justify="space-around">
                    <Form.Item>
                      <Flex vertical style={{ width: "400px" }}>
                        <Text strong>Фамилия</Text>
                        <Form.Item name="lastName">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Имя</Text>
                        <Form.Item name="firstName">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Отчество</Text>
                        <Form.Item name="patronymic">
                          <Input size="large"></Input>
                        </Form.Item>
                      </Flex>
                    </Form.Item>
                    <Form.Item>
                      <Flex vertical style={{ width: "400px", height: "100%" }}>
                        <Text strong>Email</Text>
                        <Form.Item
                          shouldUpdate
                          name="email"
                          validateStatus={
                            confirmedFields.email ? "" : "warning"
                          }
                          help={
                            confirmedFields.email
                              ? ""
                              : "Электронная почта не подтверждена"
                          }
                        >
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Дата рождения</Text>
                        <Form.Item name="birthDate">
                          <Input size="large"></Input>
                        </Form.Item>
                        <Text strong>Номер телефона</Text>
                        <Form.Item
                          shouldUpdate
                          name="phoneNumber"
                          validateStatus={
                            confirmedFields.phone ? "" : "warning"
                          }
                          help={
                            confirmedFields.phone
                              ? ""
                              : "Телефон не подтвержден"
                          }
                        >
                          <Input size="large"></Input>
                        </Form.Item>
                        {!confirmedFields.email || !confirmedFields.phone ? (
                          <>
                            <Form.Item>
                              <Button
                                style={{ width: "100%" }}
                                type="primary"
                                onClick={() => {
                                  console.log("click");
                                  setConfirmedFields({
                                    email: true,
                                    phone: true,
                                  });
                                }}
                              >
                                Подтвердить
                              </Button>
                            </Form.Item>
                            <Form.Item shouldUpdate>
                              {() => (
                                <Button
                                  style={{
                                    position: "absolute",
                                    top: "11em",
                                    width: "100%",
                                  }}
                                  type="primary"
                                  htmlType="submit"
                                  disabled={
                                    form.getFieldsValue().firstName ===
                                      profile.firstName &&
                                    form.getFieldsValue().lastName ===
                                      profile.lastName &&
                                    form.getFieldsValue().patronymic ===
                                      profile.patronymic &&
                                    form.getFieldsValue().email ===
                                      profile.email &&
                                    form.getFieldsValue().birthDate ===
                                      profile.birthDate &&
                                    form.getFieldsValue().phoneNumber ===
                                      profile.phoneNumber
                                  }
                                >
                                  Сохранить
                                </Button>
                              )}
                            </Form.Item>
                          </>
                        ) : (
                          <>
                            <Form.Item shouldUpdate>
                              {() => (
                                <Button
                                  style={{
                                    position: "absolute",
                                    top: "15em",
                                    width: "100%",
                                  }}
                                  type="primary"
                                  htmlType="submit"
                                  disabled={
                                    form.getFieldsValue().firstName ===
                                      profile.firstName &&
                                    form.getFieldsValue().lastName ===
                                      profile.lastName &&
                                    form.getFieldsValue().patronymic ===
                                      profile.patronymic &&
                                    form.getFieldsValue().email ===
                                      profile.email &&
                                    form.getFieldsValue().birthDate ===
                                      profile.birthDate &&
                                    form.getFieldsValue().phoneNumber ===
                                      profile.phoneNumber
                                  }
                                >
                                  Сохранить
                                </Button>
                              )}
                            </Form.Item>
                          </>
                        )}
                      </Flex>
                    </Form.Item>
                  </Flex>
                </Form>
              </ConfigProvider>
            </Flex>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {isMobile ? (
          <>
            <Flex vertical gap={80}>
              <Flex vertical align="center">
                <UserOutlined className="text-[15em]" />
                <Text strong style={{ fontSize: 24 }}>
                  {textGroup}
                </Text>
              </Flex>
              <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
                <Flex justify="space-evenly" gap={20}>
                  <Flex
                    vertical
                    align="start"
                    style={{ width: "fit", height: "100%" }}
                    gap={32}
                  >
                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Фамилия</Text>
                        <Text>{profile.lastName}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space
                        direction="vertical"
                        size="small"
                        className="w-full"
                      >
                        <Text strong>Имя</Text>
                        <Text>{profile.firstName}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Отчество</Text>
                        <Text>{profile.patronymic || "Нет"}</Text>
                      </Space>
                    </div>
                  </Flex>
                  <Flex
                    vertical
                    align="start"
                    style={{ width: "fit", height: "100%" }}
                    gap={32}
                  >
                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Email</Text>
                        <Text>{profile.email}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Дата рождения</Text>
                        <Text>{profile.birthDate || "Нет"}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Номер телефона</Text>
                        <Text>{profile.phoneNumber || "Нет"}</Text>
                      </Space>
                    </div>
                  </Flex>
                </Flex>
              </ConfigProvider>
            </Flex>
          </>
        ) : (
          <>
            <Flex justify="space-around">
              <Flex vertical align="center">
                <UserOutlined className="text-[15em]" />
                <Text strong style={{ fontSize: 24 }}>
                  {textGroup}
                </Text>
              </Flex>
              <ConfigProvider theme={{ token: { borderRadius: 2 } }}>
                <Flex justify="space-around">
                  <Flex
                    vertical
                    style={{ width: "400px", height: "100%" }}
                    gap={32}
                  >
                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Фамилия</Text>
                        <Text>{profile.lastName}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Имя</Text>
                        <Text>{profile.firstName}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Отчество</Text>
                        <Text>{profile.patronymic || ""}</Text>
                      </Space>
                    </div>
                  </Flex>
                  <Flex
                    vertical
                    style={{ width: "400px", height: "100%" }}
                    gap={32}
                  >
                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Email</Text>
                        <Text>{profile.email}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Дата рождения</Text>
                        <Text>{profile.birthDate || ""}</Text>
                      </Space>
                    </div>

                    <div>
                      <Space direction="vertical" size="small">
                        <Text strong>Номер телефона</Text>
                        <Text>{profile.phoneNumber || ""}</Text>
                      </Space>
                    </div>
                  </Flex>
                </Flex>
              </ConfigProvider>
            </Flex>
          </>
        )}
      </>
    );
  }
};

export default Profile;
