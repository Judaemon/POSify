import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { handleErrorValidationFromBackend } from '@/helpers/validationHelper';
import { useAuth } from '@/Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const loginFormSchema = z.object({
  email: z.string().email().min(2, {
    message: 'Email must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (loginCredentials: z.infer<typeof loginFormSchema>) => {
      return axios.post('/login', loginCredentials);
    },
    onSuccess: (res) => {
      useAuth.getState().setUser(res.data);
      navigate('/');
      console.log('Login success', res.data);
    },
    onError: (error: any) => {
      handleErrorValidationFromBackend(error.response.data.errors, form);
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
