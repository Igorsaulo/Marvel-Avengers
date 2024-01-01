'use client';
import CenterLayout from 'src/shared/layout/centerLayout';
import RegisterForm, { Field, alternativeProps } from 'src/shared/components/Form';
import { HeaderProps } from 'src/shared/components/header';
import logo from 'src/assets/Marvel_Logo.svg';
import * as yup from 'yup';
import { useRegister } from 'src/shared/queries/register/post';

const schema = yup.object().shape({
    user: yup.string().required('O email é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'As senhas precisam ser iguais')
        .required('Confirmação de senha é obrigatória'),
});


export default function Register() {
    const { mutate } = useRegister();
    const headerProps: HeaderProps = {
        logo: logo,
        title: "Gestão de grupos de heróis",
        alt: "Marvel Logo"
    }

    const alternativeProps: alternativeProps = {
        message: "Possui uma conta?",
        link: "/login",
        menssageLink: "Login"
    }

    const fields: Field[] = [
        {
            name: "user",
            label: "Email",
            type: "email"
        },
        {
            name: "password",
            label: "Senha",
            type: "password"
        },
        {
            name: "confirmPassword",
            label: "Confirmar senha",
            type: "password"
        }
    ]

    return (
        <CenterLayout>
            <RegisterForm
                buttonMessage='Registrar'
                fields={fields}
                headerProps={headerProps}
                alternativeProps={alternativeProps}
                schema={schema}
                mutate={mutate}
            />
        </CenterLayout>
    )
}