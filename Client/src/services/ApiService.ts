import {Fence} from '../declarations/Fence';

class ApiService {

  public async getAllFences(): Promise<Array<Fence>> {
    const res = await fetch(`/api/fences`);
    return res.json();
  }

  public async createFence(fence: Fence): Promise<Fence> {
    const res = await fetch(`/api/fences`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(fence),
    });
    return res.json();
  }

  public async getFence(fenceId: number): Promise<Fence> {
    const res = await fetch(`/api/fence/${fenceId}`);
    return res.json();
  }

}

let apiService: ApiService;

export const getApi = (): ApiService => {
  if (!apiService) {
    apiService = new ApiService();
  }
  return apiService;
};

export default getApi;