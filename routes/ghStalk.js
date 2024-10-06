const express = require('express');
const axios = require('axios');

const router = express.Router();

async function githubstalk(user) {
    try {
        const { data } = await axios.get(`https://api.github.com/users/${user}`);
        const hasil = {
            username: data.login,
            nickname: data.name,
            bio: data.bio,
            id: data.id,
            nodeId: data.node_id,
            profile_pic: data.avatar_url,
            url: data.html_url,
            type: data.type,
            admin: data.site_admin,
            company: data.company,
            blog: data.blog,
            location: data.location,
            email: data.email,
            public_repo: data.public_repos,
            public_gists: data.public_gists,
            followers: data.followers,
            following: data.following,
            ceated_at: data.created_at,
            updated_at: data.updated_at
        };
        return hasil;
    } catch (error) {
        throw new Error('Failed to fetch GitHub user data.');
    }
}

router.get("/ghstalk", async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({
            status: 400,
            message: "Masukkan nama pengguna!"
        });
    }
    try {
        const userData = await githubstalk(username);
        res.json(userData);
    } catch (error) {
        console.error('Error fetching GitHub user data:', error);
        res.status(500).json({ error: 'Failed to fetch GitHub user data.' });
    }
});

module.exports = router;
