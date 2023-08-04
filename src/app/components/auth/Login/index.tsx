'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import React from 'react';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.').nonempty('O e-mail nâo pode ser vazio.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();

    async function handleSubmitClick({ email, password }: LoginSchemaType) {
        const data = await login({ email, password });

        if (!data) return;

        if (data.error) {
            return setError('email', { message: data.message });
        }

        router.replace('/');
        router.refresh();
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
            <div className="w-[80] h-[80]">
                <Image src="/logo.png" width={80} height={80} alt="Logo" />
            </div>

            <Card title="Login">
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
                    <Button>Entrar</Button>
                </form>
            </Card>
        </div>
    );
}
