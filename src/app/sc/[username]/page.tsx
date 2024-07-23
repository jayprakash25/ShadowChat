"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "@/components/ui/use-toast";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    console.log(data);
    try {
      const url = window.location.pathname;
      const username = url.split("/")[2];
      const response = await axios.post(`/api/send-message`, {
        username: username,
        content: data.message,
      });
      toast({
        title: "Message sent successfully",
        description: response.data.message,
        // variant: "success",
      });
      form.setValue("message", "");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Message wasn't sent successfully",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // zod implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    form.setValue("message", suggestion);
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh] md:h-auto md:w-full max-w-2xl mx-5 text-center md:mx-auto md:my-12 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Send Me Anonymous Texts
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Want to say something but Fear Me? No worries it&apos;s Anonymous
          </p>
        </div>
        <div className="w-full space-y-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative z-10 max-w-2xl mx-auto flex items-center overflow-hidden rounded-lg shadow-sm p-1">
                        <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#C0C0C0_20deg,transparent_120deg)]"></div>
                        <div className="relative z-20 flex w-full rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                          <Input
                            type="text"
                            placeholder="Say it... Ik you want to"
                            className="w-full ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0 px-6 py-6 text-lg font-medium bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
                            {...field}
                            onChange={(e) => {
                              setMessage(e.target.value);
                              field.onChange(e);
                            }}
                            onKeyPress={handleKeyPress}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium rounded-lg shadow-lg shadow-primary/50 hover:shadow-primary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
              >
                Send
              </Button>
            </form>
          </Form>

          <div className="flex flex-wrap items-center justify-center pt-10 gap-2">
            {[
              "What’s your secret guilty pleasure?",
              "What’s something that made you go 'literally me'?",
              "What’s a hashtag you’d use to describe Joe?",
              "What’s your ultimate ‘main character’ moment?",
              "How's Life?"
            ].map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                className="px-4 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-gray-900"
                onClick={() => handleSuggestionClick(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
