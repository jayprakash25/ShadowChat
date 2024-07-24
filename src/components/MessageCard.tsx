import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void
}

const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {

    const {toast} = useToast();
    const handleDelete = async() => {
        console.log(message)
          const result = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
          toast({
            title: result.data.message,
        })
        onMessageDelete(message._id as string)
    }

    




  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex w-full justify-between">
          <CardTitle>Message</CardTitle>
          <AlertDialogBox handleDelete={handleDelete} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{message.content}</p>
        </CardContent>
      </Card>

      

    </div>
  );
};

export default MessageCard;


const AlertDialogBox = ({handleDelete}: {handleDelete: () => void}) => {
    
    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-8 p-2 h-8"><X className=""/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}