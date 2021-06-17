const  randomProfilePic = ()=>{
    const profilePicLinks = [
        "https://randomuser.me/api/portraits/men/44.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/men/43.jpg",
        "https://randomuser.me/api/portraits/men/65.jpg",
        "https://randomuser.me/api/portraits/men/39.jpg",
        "https://randomuser.me/api/portraits/men/0.jpg",
        "https://randomuser.me/api/portraits/men/69.jpg",
        "https://randomuser.me/api/portraits/men/24.jpg",
        "https://randomuser.me/api/portraits/men/73.jpg",
        "https://randomuser.me/api/portraits/men/79.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/men/14.jpg",
        "https://randomuser.me/api/portraits/men/15.jpg",
        
        "https://randomuser.me/api/portraits/women/53.jpg",
        "https://randomuser.me/api/portraits/women/38.jpg",
        "https://randomuser.me/api/portraits/women/39.jpg",
        "https://randomuser.me/api/portraits/women/37.jpg",
        "https://randomuser.me/api/portraits/women/9.jpg",
        "https://randomuser.me/api/portraits/women/10.jpg",
        "https://randomuser.me/api/portraits/women/56.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
     "https://randomuser.me/api/portraits/women/13.jpg",
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/women/47.jpg"
    ]

    return profilePicLinks[Math.floor(Math.random()*profilePicLinks.length)]
}

export default randomProfilePic