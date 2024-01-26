import { promises } 
from 'fs';
import { useEffect } from 'react';

interface ReadTaskProps {
    slug?: string,
    passStageSlugs: (data: string[]) => void,
    passTasks: (data: ICodeTask) => void
}

const ReadTask: React.FC<ReadTaskProps> = 
({slug, passStageSlugs, passTasks}) => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`./data/codeTasks.json`);
                const data = await res.json();
                slug ?
                    passTasks(data[slug])
                :
                    initializeSlugs(data)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchData();
    }, [slug]);
    return (<></>);

    function initializeSlugs(data: any) {
        const allStageSlugs: string[] = []
        Object.entries(data).map(([key,val]) => {
            allStageSlugs.push(key);
        })
        passStageSlugs(allStageSlugs)
    }
}

export default ReadTask;