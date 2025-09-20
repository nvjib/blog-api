const supabase = require("../db")

const createPost = async (req, res) => {
    const { title, content } = req.body

    const postTitle = title.trim()
    const postContent = content.trim()
    

    if (!postTitle || !postContent.trim()) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    if (postTitle.length > 255) {
        return res.status(400).json({ error: "Title is too long (max 255 characters)" })
    }

    const { data, error } = await supabase
        .from("posts")
        .insert({ title: postTitle, content: postContent })
        .select()
        .single()

    if (error) return res.status(500).json({ error: error.message })
    if (!data) return res.status(404).json({ error: "Post could not be created" })

    return res.status(201).json({ message: "Post created!", data })
}

const fetchAllPosts = async (req, res) => {
    const { data, error } = await supabase.from("posts").select("*")

    if (error) return res.status(500).json({ error: error.message })
    if (!data || data.length === 0) return res.status(404).json({ error: "Posts could not be found" })

    return res.status(200).json(data)
}

const singlePost = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)

    if (error) return res.status(500).json({ error: error.message })
    if (!data || data.length === 0) return res.status(404).json({ error: "Post not found" })

    return res.status(200).json(data)
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body

    const updateTitle = title.trim()
    const updateContent = content.trim()

    if (!updateTitle || !updateContent) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    const { data, error } = await supabase
        .from("posts")
        .update({ title: updateTitle, content: updateContent })
        .select()
        .eq("id", id)

    if (error) return res.status(500).json({ error: error.message })
    if (!data || data.length === 0) return res.status(404).json({ error: "Post not found" })

    return res.status(200).json({ message: "Updated successfully", data })
}

const deletePost = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: "Post ID is required" })

    const { data, error } = await supabase
        .from("posts")
        .delete()
        .select()
        .eq("id", id)

    if (error) return res.status(500).json({ error: error.message })
    if (!data || data.length === 0) return res.status(404).json({ error: "Post could not be found" })

    return res.status(200).json({ message: "Post deleted successfully", data })
}

module.exports = {
    createPost,
    fetchAllPosts,
    singlePost,
    updatePost,
    deletePost
}