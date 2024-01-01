'use client';
import CenterLayout from 'src/shared/layout/centerLayout';
import RegisterForm, { Field, alternativeProps } from 'src/shared/components/Form';
import { HeaderProps } from 'src/shared/components/header';
import logo from 'src/assets/Marvel_Logo.svg';
import * as yup from 'yup';
import { useLogin } from 'src/shared/queries/auth/login';

const schema = yup.object().shape({
    user: yup.string().required('Email é obrigatório'),
    password: yup.string().required('Senha é obrigatória')
});

export default function Register() {
    const { mutate } = useLogin();
    const headerProps: HeaderProps = {
        logo: logo,
        title: "Gestão de grupos de heróis",
        alt: "Marvel Logo"
    }

    const alternativeProps: alternativeProps = {
        message: "Ainda não possui uma conta?",
        link: "/register",
        menssageLink: "Cadastro"
    }

    const fields: Field[] = [
        {
            name: "user",
            label: "Email",
            type: "text"
        },
        {
            name: "password",
            label: "Senha",
            type: "password"
        }
    ]

    return (
        <CenterLayout>
            <RegisterForm
                buttonMessage='Entrar'
                fields={fields}
                headerProps={headerProps}
                alternativeProps={alternativeProps}
                schema={schema}
                mutate={mutate}
            />
        </CenterLayout>
    )
}