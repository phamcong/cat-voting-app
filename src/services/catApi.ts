// TheCatAPI service
const API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_1234567890abcdef'; // You'll need to replace this with your actual API key

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id: string;
  value: number;
  created_at: string;
}

export interface VoteRequest {
  image_id: string;
  sub_id: string;
  value: number;
}

class CatApiService {
  private headers = {
    'x-api-key': 'live_hIpXu48Rl5TfI96hDv6C6BG9R1fLF8kXNysPrZG6DR7HodtOYBiobNKrOWEBgIv3',
    'Content-Type': 'application/json',
  };

  async getRandomImages(limit: number = 10): Promise<CatImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/images/search?limit=${limit}`, {
        headers: this.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching random images:', error);
      throw error;
    }
  }

  async createVote(voteData: VoteRequest): Promise<Vote> {
    try {
      const response = await fetch(`${API_BASE_URL}/votes`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(voteData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create vote: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating vote:', error);
      throw error;
    }
  }

  async getUserVotes(subId: string): Promise<Vote[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/votes?sub_id=${subId}`, {
        headers: this.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user votes: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching user votes:', error);
      throw error;
    }
  }
}

export const catApiService = new CatApiService();
