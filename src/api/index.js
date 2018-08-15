import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
//增加默认的请求路径
//获取轮播图数据,返回的是promise实例
export let getSliders = ()=>{
  return axios.get('/sliders')
}

//获取热门图书接口
export let getHotBook = () =>{
  return axios.get('./hotbook');
};

//获取全部图书
export let allBook = () =>{
  return axios.get('/booklist');
};

//删除某一本图书
export let removeBook = (id) =>{
  return axios.delete(`/booklist?id=${id}`)
};

//获取某一本书
export let getOneBook = (id) => {
  return axios.get(`/booklist?id=${id}`);
}

//修改一本书的信息
/*
* @param id 编号
* @param data 数据 请求体发送
* @returns {AxiosPromise<T>}
* */
export let updateBook = (id,data) => {
  return axios.put(`/booklist?id=${id}`,data);
}

//添加书籍
export let addBook = (data) => {
  return axios.post('/booklist',data);
}


export let getAll = () => {
  return axios.all([getSliders(),getHotBook()]);
}

export let pagitation = (offset) => {
  return axios.get(`/page?offset=${offset}`)
}


