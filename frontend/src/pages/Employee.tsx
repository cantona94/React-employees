import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../app/services/employees';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { Layout } from '../components/layout';
import { Descriptions, Space, Divider, Modal } from 'antd';
import { CustomButton } from '../components/custom-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ErrorMessage } from "../components/error-message";
import { Paths } from '../paths';
import { isErrorWithMessage } from '../utils/is-error-with-message';

export const Employee = () => {
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const { data, isLoading } = useGetEmployeeQuery(params.id || "");
    const [removeEmployee] = useRemoveEmployeeMutation();
    const user = useSelector(selectUser);

    if (isLoading) {
        return <span>Загрузка</span>;
    }

    if (!data) {
        return <Navigate to="/" />;
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteUser = async () => {
        hideModal();

        try {
            await removeEmployee(data.id).unwrap();

            navigate(`${Paths.status}/deleted`);
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            if (maybeError) {
                setError(err.data.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    };

    return (
        <Layout>
            <Descriptions title="Информация о сотруднике" bordered>
                <Descriptions.Item label="Имя" span={3}>
                    {`${data.firstName} ${data.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label="Возраст" span={3}>
                    {data.age}
                </Descriptions.Item>
                <Descriptions.Item label="Адрес" span={3}>
                    {data.address}
                </Descriptions.Item>
            </Descriptions>
            {user?.id === data.userId && (
                <>
                    <Divider orientation="left">
                        Действия
                    </Divider>
                    <Space>
                        <Link to={`/employee/edit/${data.id}`}>
                            <CustomButton
                                shape="round"
                                type="default"
                                icon={<EditOutlined />}
                            >
                                Редактировать
                            </CustomButton>
                        </Link>
                        <CustomButton
                            shape="round"
                            danger
                            onClick={showModal}
                            icon={<DeleteOutlined />}
                        >
                            Удалить
                        </CustomButton>
                    </Space>
                </>
            )}
            <ErrorMessage message={error} />
            <Modal
                title="Подтвердите удаление"
                open={isModalOpen}
                onOk={handleDeleteUser}
                onCancel={hideModal}
                okText="Подтвердить"
                cancelText="Отменить"
            >
                Вы действительно хотите удалить сотрудника из таблицы?
            </Modal>
        </Layout>
    )
}
