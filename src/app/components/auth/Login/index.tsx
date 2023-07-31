'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import React from 'react';
import { z } from 'zod';
import { useSession } from '@/hooks/useSession';
import { useDispatch } from 'react-redux';
import { FaCircleNotch } from 'react-icons/fa6';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.').nonempty('O e-mail nâo pode ser vazio.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const dispatch = useDispatch();
    const { login, status } = useSession();

    async function handleSubmitClick({ email, password }: LoginSchemaType) {
        const data = await login(email, password, dispatch);
        if (!data) return;

        if (data.error) {
            return setError('email', { message: data.message });
        }
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
            <div className="w-[150] h-[150]">
                <Image src="/logo.png" width={150} height={150} alt="Logo" />
            </div>

            <Card title="Login">
                <span>{status}</span>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleSubmitClick)}>
                    <div className="mb-4 flex flex-col gap-3">
                        <Input
                            className="w-full"
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            hookFormRegister={register('email')}
                            error={errors.email?.message?.toString()}
                        />
                        <Input
                            className="w-full"
                            type="password"
                            name="password"
                            placeholder="Senha"
                            hookFormRegister={register('password')}
                            error={errors.password?.message?.toString()}
                        />
                    </div>
                    <Button disabled={status === 'loading'}>
                        {status === 'loading' ? <FaCircleNotch className="animate-spin" size={20} /> : 'Entrar'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
