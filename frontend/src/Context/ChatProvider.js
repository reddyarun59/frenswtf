import { createContext } from "react"

const ChatContext=createContext()

const ChatProvider=({children})=>{

    return(
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider