import { LoaderFunction, useLoaderData } from "remix";

export interface User {
    login: string
    avatar_url: string
    html_url: string
    bio: string
}

export interface LoaderData {
    user: User;
}

export const loader: LoaderFunction = async ({params}) => {
    const res = await fetch(`https://api.github.com/users/${params.username}`, {
        // headers: {
        //     accept: "application/vnd.github.v3+json",
        //     Authorization: "`token ${secrets.GITHUB_API_TOKEN}`"
        // }
    });
    
    return {
        user: await res.json(),
    }
};

export default function () {
    const { user } = useLoaderData<LoaderData>();

    return (
        <>
            <h1>{ user.login }</h1>
            <p>{ user.bio }</p>
            <img src={ user.avatar_url } alt={ user.login } width="150"/>
        </>
    );
}