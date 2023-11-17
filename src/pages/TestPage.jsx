import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const TestPage = () => {

    const [token, setToken]=useState();
    const appKey = '';
    const appSecret = '';
    const domain = 'https://openapivts.koreainvestment.com:29443';
    // const help = 'https://cors-anywhere/herokuapp.com';

    function createToken(){
        axios
            .post(`${domain}/oauth2/tokenP`,{
                "grant_type": "client_credentials",
                "appsecret": appSecret,
                "appkey": appKey
              })
            .then((res)=>{
                console.log(res);
                setToken(res.data.access_token)
            })
            .catch((e)=>{
                console.log(e);
            });
    };

    function getStock(){
        axios
            .get(`${domain}/uapi/domestic-stock/v1/quotations/inquire-price`,{
            headers:{
                "authorization" : `Bearer ${token}`,
                "appkey" : appKey,
                "appsecret" : appSecret,
                "tr_id" : "FHKST01010400",
            },
            params:{
                "FID_COND_MRKT_DIV_CODE" : "J",
                "FID_INPUT_ISCD" : "005930",//삼전
                "FID_PERIOD_DIV_CODE":"D",
                "fid_org_adj_prc":"0000000000"
            }})
            .then((res)=>{
                console.log(res);
            })
            .catch((e)=>{
                console.log(e);
            });
    };

    function deleteToken(){
        axios
            .post(`${domain}/oauth2/revokeP`,{
                "appkey" : appKey,
                "appsecret" : appSecret,
                "token" : token
            })
            .then((res)=>{
                console.log('토큰 삭제 완료!');
                console.log(res);
            })
            .catch((e)=>{
                console.log(e);
            });
    };

    return (
        <div>
            <h2>한국투자증권api테스트</h2>
            <button onClick={createToken}>토큰 생성</button>
            <button onClick={getStock}>주가 요청</button>
            <button onClick={deleteToken}>토큰 폐기</button>
            <br/>
            {token!==undefined ? <p>토큰 : {token}</p>:<p>토큰이 없음.</p>}
        </div>
    );
};

export default TestPage;
