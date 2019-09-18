import { useEffect } from 'react';

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title
        return () => {
            document.title = '学习项目'
        }
    }, [title]) 
}