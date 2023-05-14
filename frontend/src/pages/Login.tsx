import { Row, Card, Form, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { Layout } from '../components/layout';
import { CustomInput } from '../components/custom-input';
import { PasswordInput } from '../components/password-input';
import { CustomButton } from "../components/custom-button";
import { Paths } from "../paths";

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
          <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
