import {Agent, Property} from '@/utils/types'

export async function get_users() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

export async function get_agents() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/users/agents/");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: Agent[]  = await res.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

export async function get_properties(params?: { userID?: string }) {
  let url = "http://127.0.0.1:8000/api/v1/properties";
  console.log(params)
  if (params?.userID) {
    url += `?agent_id=${params.userID}`;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data: Property[]  = await res.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

