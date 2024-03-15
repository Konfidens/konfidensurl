'use client';

import React from 'react';
import { Link, deleteLink, getAllLinks } from '@/lib/links';
import { login, register, User } from '@/lib/login';

export default function Front({ users }: { users: any }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function getLinks() {
    const data = await getAllLinks();
    console.log(data);
    return data.links;
  }
  const [links, setLinks] = React.useState([] as Link[]);
  React.useEffect(() => {
    getLinks().then((data) => setLinks(data));
    console.log(links);
  }, []);

  // login returnerer to ting: user (object med type User) og token (string)
  async function loginUser(
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
  ) {
    e.preventDefault();
    const user = await login(username, password);
    console.log(user);
  }

  async function registerUser(
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
  ) {
    e.preventDefault();
    const user: User = await register(username, password);
    console.log(user);
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>elias tester</h1>
      {/* input field for å gi navn til nye paths */}
      <h1 className='text-3xl'>Alle linker laget:</h1>
      <div className='flex flex-col gap-2'>
        {/* mapper over alle linker */}
        {links.map((link) => (
          <div
            key={link.path}
            className='flex items-center gap-2 rounded-lg bg-red-400 p-1'
          >
            <a className='text-blue-700 underline' href={`/${link.path}`}>
              Path: {link.path}
            </a>{' '}
            - URL: {link.url} - Expires: {link.expires} - Clicks: {link.clicks}
            {/* slett link */}
            <button
              onClick={() => deleteLink(link.id)}
              className='rounded-lg border-2 border-black p-1'
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
      <h1 className='text-2xl'>Login</h1>
      <form onSubmit={(e) => loginUser(e, username, password)}>
        <input
          type='text'
          className='border-2 border-black'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          className='border-2 border-black'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Login</button>
      </form>

      <h1 className='text-2xl'>Lag bruker</h1>
      <form onSubmit={(e) => registerUser(e, username, password)}>
        <input
          type='text'
          className='border-2 border-black'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type='password'
          className='border-2 border-black'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type='submit'>Lag bruker</button>
      </form>

      <div className='flex'>
        {users.map((user: any) => (
          <div
            key={user.id}
            className='flex flex-col rounded-md border-2 border-black p-2'
          >
            <span>{user.username}</span>
            <span>{user.password}</span>
          </div>
        ))}
      </div>
    </div>
  );
}