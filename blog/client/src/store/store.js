import posts from "../data/posts.json";


const initState ={

    blog_posts:posts,
    selected_post: "",
    blogState:false
  

}

const storeReducer = (state=initState, action) =>{

    if(action.type === 'BLOG_UPDATE'){

        return{
            ...state,
            blogState: !state.blogState
        }
    }


   if(action.type ==='ADD_POST'){

    return{
        ...state,
        blog_posts:[action.payload, ...state.blog_posts]
    }
   }

   if(action.type ==='SELECT_POST'){
      
    return{
        ...state,
        selected_post: action.payload,
       
    }
   }

   if(action.type === 'ADD_COMMENT'){
    let old_posts = state.blog_posts.filter(item=> item.post != state.selected_post.post )
    
    state.selected_post.user_comments = [action.payload, ...state.selected_post.user_comments]
    return{
        ...state,
        blog_posts: [...old_posts,state.selected_post ]
        
    }
   }

      if(action.type === 'DELETE_COMMENT'){
        let old_posts = state.blog_posts.filter(item=> item.post != state.selected_post.post )
        let new_comments =  state.selected_post.user_comments.filter(item=> item != action.payload)
        let updatedPost = state.selected_post
        updatedPost.user_comments =new_comments
        console.log(updatedPost)
     return{
        
        blog_posts: [updatedPost, ...old_posts],
        selected_post:updatedPost
    }
   }

   if(action.type === 'DELETE_POST'){

    let new_posts = state.blog_posts.filter(item=> item.post != action.payload )
    return{
       ...state,
       blog_posts: new_posts
   }
  }


  


   return state;
}

export default storeReducer

