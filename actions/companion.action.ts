"use server"; // only to be used on server as its server work
import { createSupabaseClient } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth()
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.from('Companions').insert({ ...formData, author }).select()

    if (error || !data) throw new Error(error?.message || "Failed to create a companion")
    return data[0];

}
export const getAllCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic
}: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('Companions').select('*'); // be explicit with select if needed

    // Filter by subject and/or topic
    if (subject && topic) {
        query = query
            .ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
    }

    // Pagination - range is 0-indexed: start = (page-1)*limit, end = page*limit - 1
    query = query.range((page - 1) * limit, page * limit - 1);

    // Now execute the query
    const { data: companions, error } = await query;

    if (error) {
        throw new Error(error.message || 'Failed to fetch Companions');
    }

    return companions ?? []; // return empty array if null
};

export const getCompanion = async (id:string) =>{
    const supbase = createSupabaseClient();

    const {data,error} =await supbase.from('Companions').select().eq('id',id);

    if(error){
        return console.log(error)
    }
    return data[0]
}