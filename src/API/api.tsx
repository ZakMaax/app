import {Agent} from '@/utils/types'

export async function get_users() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
}

export async function get_agents() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/agents/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: Agent[]  = await res.json();
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
}

