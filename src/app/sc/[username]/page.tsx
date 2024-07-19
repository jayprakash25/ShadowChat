'use client';

import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { messageSchema } from '@/schemas/messageSchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from '@/components/ui/use-toast';


const SendMessage = () => {

  const [message, setMessage] = useState('');
  


  const onSubmit = async(data: z.infer<typeof messageSchema>) => {
    console.log(data)
    try {
      const url = window.location.pathname
      const username = url.split("/")[2]
      const response = await axios.post(`/api/send-message`, {
        username: username,
        content: data.message
      })
      toast({
        title: "Message sent successfully",
        description: response.data.message,
        variant: "success",
      });  
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Message wasn't sent successfully",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }


   //zod implementation
   const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ""
    },
  });

  return (
    <div>
      <Navbar />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                  onChange={(e) => {  
                    setMessage(e.target.value)
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default SendMessage