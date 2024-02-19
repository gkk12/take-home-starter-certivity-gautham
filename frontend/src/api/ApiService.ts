import axios from 'axios'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query';
import { HtmlEntity } from '../types/HtmlEntity'
import { UserCommentEntity } from '../types/UserCommentEntity'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

type CustomResponse = {
  message: string
}

const useGetHelloWorld = () => {
  return useQuery<CustomResponse, Error>(['hello'], async () => {
    const response = await apiClient.get<CustomResponse>('/')
    return response.data
  })
}

const useRetrieveContent = () => {
  return useQuery<HtmlEntity[], Error>(['retrieveContents'], async () => {
    const response = await apiClient.get<HtmlEntity[]>('/retrieveContents')
    return response.data
  })
}

const useAddComment = () => {
  return useMutation<UserCommentEntity, Error, { contentId: string, commentor: string, comment: string }>(
    async ({ contentId, commentor, comment }) => {
      const response = await apiClient.post<UserCommentEntity>('/comment', {
        contentId,
        commentor,
        comment,
      });
      return response.data;
    }
  );
};

const useRetrieveComments = (contentId: string) => {
  return useQuery<UserCommentEntity[], Error>(['comments', contentId], async () => {
    const response = await apiClient.get<UserCommentEntity[]>(`/comments?contentId=${contentId}`);
    return response.data;
  });
};

const useDeleteComment = () => {
  return useMutation<void, Error, { contentId: string, commentId: string }>(
    async ({ contentId, commentId }) => {
      await apiClient.delete<void>(`/comment?contentId=${contentId}&commentId=${commentId}`);
    }
  );
};

const useEditComment = () => {
  return useMutation<void, Error, { contentId: string, commentId: string, comment: string, commentor: string }>(
    async ({ contentId, commentId, comment, commentor }) => {
      await apiClient.put<void>(`/comment?contentId=${contentId}&commentId=${commentId}`, { comment, commentor });
    }
  );
};

const ApiService = {
  useGetHelloWorld, useRetrieveContent, useAddComment, useRetrieveComments, useDeleteComment, useEditComment
}
export default ApiService
