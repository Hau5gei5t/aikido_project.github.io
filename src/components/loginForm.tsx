import React, { useEffect } from "react";
import { Button, Form, Input, Checkbox, ConfigProvider } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockTwoTone,
  MailTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Login } from "../services/login.service";
import ILogin from "../interfaces/login.interface";

const LoginForm: React.FC = () => {
  const [data, setData] = React.useState<ILogin>();
  const navigate = useNavigate();
  const onFinish = (values: ILogin) => {
    const { email, password } = values;
    const req = {
      email,
      password,
    };

    setData(req);
  };
  useEffect(() => {
    if (data) {
      Login(data).then((res) => {
        navigate(`/`, {
          replace: true,
          state: { id: res.user.id, type: "Главная", firstName: res.user.firstName, lastName: res.user.lastName },
        });
      });
    }
  }, [data]);

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: {},
            Button: {},
          },
          token: {},
        }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="email"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Введите Email" }]}
          >
            <Input placeholder="Логин" size="large" prefix={<MailTwoTone />} />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              placeholder="Пароль"
              size="large"
              prefix={<LockTwoTone />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default LoginForm;
