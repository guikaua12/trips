'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast, TypeOptions } from 'react-toastify';
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido.').nonempty('O e-mail nâo pode ser vazio.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const alert = (message: string, type: TypeOptions) => toast(message, { type: type });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
    });

    const { login } = useAuth();

    async function handleSubmitClick({ email, password }: LoginSchemaType) {
        setLoading(true);
        const data = await login({ email, password });
        setLoading(false);

        if (!data) return;

        if (data.error && data.message) {
            return alert(data.message, 'error');
        }

        router.replace('/');
        router.refresh();
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
            <div className="h-[80] w-[80]">
                <Image src="/logo.png" width={80} height={80} alt="Logo" />
            </div>

            <Card title="Login" className="max-w-sm">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSubmitClick)}>
                    <div className="flex flex-col gap-3">
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

                    <div className="text-sm text-gray">
                        Ainda não tem uma conta?
                        <Link href="/auth/register" className="ml-1 font-medium text-purple">
                            Registrar
                        </Link>
                    </div>

                    <Button disabled={loading}>
                        {loading ? (
                            <AiOutlineLoading3Quarters className="min-h-[1.063rem] min-w-[1.063rem] animate-spin text-white" />
                        ) : (
                            'Entrar'
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
