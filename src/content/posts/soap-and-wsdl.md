---
title: "SOAP 與 WSDL：與現代網頁開發中常見的API規格有何不同？"
date: 2023-06-28 14:04:16
category: "🌐 網路"
tags:
  - "網路"
  - "網頁開發"
cover: "/images/covers/soap-and-wsdl.webp"
description: "在現代網頁開發中，API（Application Programming Interface）規格扮演著關鍵的角色，讓不同的應用程式能夠互相通信和共享資源。在眾多API規格中，SOAP（Simple Object Access Protocol）和WSDL（Web Services Description Language）具有獨特的特點和歷史。本文將介紹SOAP和WSDL，並探討它們與現代API規格的區別。"
---

在現代網頁開發中，API（Application Programming Interface）規格扮演著關鍵的角色，讓不同的應用程式能夠互相通信和共享資源。在眾多API規格中，SOAP（Simple Object Access Protocol）和WSDL（Web Services Description Language）具有獨特的特點和歷史。本文將介紹SOAP和WSDL，並探討它們與現代API規格的區別。
## SOAP 和 WSDL 簡介

### WSDL(Web Services Description Language)

WSDL 全名為 Web Services Description Language，是一種用於描述 Web 服務的語言，主要目的提供一種標準的描述方式，使得不同平台與程式語言之間可以互相理解與溝通。

範例：

```xml
<definitions name="UserService"
             targetNamespace="http://www.example.com/webservice"
             xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://www.example.com/webservice"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema">

   <message name="GetUserInfoRequest">
      <part name="UserID" type="xsd:string"/>
   </message>

   <message name="GetUserInfoResponse">
      <part name="UserInfo" type="xsd:string"/>
   </message>

   <portType name="UserPortType">
      <operation name="GetUserInfo">
         <input message="tns:GetUserInfoRequest"/>
         <output message="tns:GetUserInfoResponse"/>
      </operation>
   </portType>

   <binding name="UserBinding" type="tns:UserPortType">
      <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
      <operation name="GetUserInfo">
         <soap:operation soapAction="http://www.example.com/webservice/GetUserInfo"/>
         <input>
            <soap:body use="literal"/>
         </input>
         <output>
            <soap:body use="literal"/>
         </output>
      </operation>
   </binding>

   <service name="UserService">
      <port name="UserPort" binding="tns:UserBinding">
         <soap:address location="http://www.example.com/webservice"/>
      </port>
   </service>

</definitions>
```

### SOAP(Simple Object Access Protocol)

SOAP 全名為 Simple Object Access Protocol，是一種網路通信協定，主要目的是讓不同平台上的應用程式能夠透過網際網路進行溝通和交互。

範例：

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"
               xmlns:example="http://www.example.com/webservice">
   <soap:Header/>
   <soap:Body>
      <example:GetUserInfo>
         <example:UserID>123456</example:UserID>
      </example:GetUserInfo>
   </soap:Body>
</soap:Envelope>
```

## 與現代API規格差異

SOAP和WSDL具有一些獨特的特點和限制。

首先，SOAP使用XML格式進行資料傳輸，而現代API規格更傾向於使用輕量級的資料交換格式，如JSON。

此外，SOAP的訊息結構相對複雜，而RESTful API更加簡潔和易於理解。

|  | SOAP與WSDL | 現代 API 規格 (Swagger / OpenAPI) |
| --- | --- | --- |
| 資料格式 | 使用XML格式 | 使用輕量級格式（如JSON、YAML） |
| 資料交換 | 較為結構化，使用XML元素和命名空間 | 簡潔且易於解析的結構 |
| 資料描述語言 | WSDL | 使用Swagger / OpenAPI規範描述API結構 |
| 可讀性與易用性 | 複雜且較難閱讀，需要熟悉XML概念 | 結構清晰且易於理解 |
| 擴展性 | 提供較多的標準化擴展機制 | 靈活且容易擴展 |
| 開發與維護成本 | 較高，需要額外的開發和配置工作 | 較低，較易於開發和維護 |

## 結論

隨著現代API規格的不斷發展，SOAP和WSDL在網頁開發中的使用情況可能會減少。然而，由於某些應用領域對於安全性和標準化的需求，SOAP和WSDL仍然會在一些特定領域中保持其重要性。
