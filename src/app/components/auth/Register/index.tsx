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
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const registerSchema = z
    .object({
        email: z.string().email('E-mail inválido.').nonempty('O e-mail nâo pode ser vazio.'),
        password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
        confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'As senhas devem ser iguais.',
                path: ['confirmPassword'],
            });
        }
    });

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function Register() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setError,
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
    });

    const { register: registerUser } = useAuth();

    async function handleSubmitClick({ email, password }: RegisterSchemaType) {
        setLoading(true);
        const data = await registerUser({ email, password });
        setLoading(false);

        if (!data) return;

        if (data.error) {
            return setError('email', { message: data.message });
        }

        router.replace('/');
        router.refresh();
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-5">
            <div className="h-[80] w-[80]">
                <Image src="/logo.png" width={80} height={80} alt="Logo" />
            </div>

            <Card title="Registro" className="max-w-sm">
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
                        <Input
                            className="w-full"
                            type="password"
                            name="confirm-password"
                            placeholder="Confirmar Senha"
                            hookFormRegister={register('confirmPassword')}
                            error={errors.confirmPassword?.message?.toString()}
                        />
                    </div>

                    <div className="text-sm text-gray">
                        Já tem uma conta?
                        <Link href="/auth/login" className="ml-1 font-medium text-purple">
                            Login
                        </Link>
                    </div>

                    <Button>
                        {loading ? (
                            <AiOutlineLoading3Quarters className="min-h-[1.063rem] min-w-[1.063rem] animate-spin text-white" />
                        ) : (
                            'Registrar'
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
