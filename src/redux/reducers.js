import jwtDecode from 'jwt-decode';




export const userInfoReducer = (state = {}, action)=>{
    switch(action.type){
      case 'UPDATE_USERINFO':
        if(!localStorage.token){
          return {...state, user_info:'failed'}
        }
        const payLoad = jwtDecode(localStorage.token)
        if(!payload){
          return {...state, user_info:'failed'}
        }
        if(!payLoad.exp){
          return {...state, user_info:'failed'}
        }
        if(+payLoad.exp<+(Date.now()/1000).toString().split('.')[0]){
          return {...state, user_info:'failed'}
        }
        return {...state, user_info:payLoad}
  
      default:
        return state;
    }
  }

export const profilePicsReducer = (state = {}, action)=>{
    switch(action.type){
      case 'PROFILE_PICS_RUN':
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
      
          const memberPic = profilePicLinks[Math.floor(Math.random()*profilePicLinks.length)]
          const adminPic = "https://randomuser.me/api/portraits/men/49.jpg"
          
          return {
            ...state,
            memberPic,
            adminPic
          }
      default:
        return state;
    }
  }
