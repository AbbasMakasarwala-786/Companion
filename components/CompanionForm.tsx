"use client"
import React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { subjects } from "@/constants"
import { createCompanion } from "@/actions/companion.action"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion name is Required" }),
    subject: z.string().min(1, { message: "Companion Subject is Required" }),
    topic: z.string().min(1, { message: "Companion Topic is Required" }),
    voice: z.string().min(1, { message: "Companion Voice is Required" }),
    style: z.string().min(1, { message: "Companion Style is Required" }),
    duration: z.coerce.number().min(1, { message: "Companion duration is Required" }),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values)

        if (companion) {
            redirect(`/companions/${companion.id}`)
        }
        else {
            console.log("Failed to Create Companion")
            redirect('/');
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" suppressHydrationWarning>
                {/* name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the Companion Name"
                                    {...field}
                                    className="input"
                                    suppressHydrationWarning
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* subject (select) */}
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion&apos;s Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => field.onChange(val)}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize" suppressHydrationWarning>
                                        <SelectValue placeholder="Select the Subject" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem value={subject} key={subject} className="capitalize">
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* topic */}
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What Should the Companion help with ?</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex. Derivatives & Integrals"
                                    {...field}
                                    className="input"
                                    suppressHydrationWarning
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* voice select */}
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => field.onChange(val)}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize" suppressHydrationWarning>
                                        <SelectValue placeholder="Select the Voice" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* style select */}
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => field.onChange(val)}
                                    value={field.value}
                                >
                                    <SelectTrigger className="input capitalize" suppressHydrationWarning>
                                        <SelectValue placeholder="Select the Style" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Formal">Formal</SelectItem>
                                        <SelectItem value="Casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* duration */}
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimates session Duration in minutes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                    className="input"
                                    suppressHydrationWarning
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full cursor-pointer" suppressHydrationWarning>
                    Build your Companion
                </Button>
            </form>
        </Form>
    )
}

export default CompanionForm