# nodebird 프로젝트 AWS lightSail로 배포하기

## 배포 절차
### 1. 인스턴스 화면에서 Connect using SSH 클릭

![Image](https://github.com/user-attachments/assets/43be48bb-5982-4129-adf6-1a2219c51a3e)

- 브라우저 새 창에서 Lightsail용 콘솔이 실행됨.

### 2. MySQL 설치

#### 1) mysql 설치 명령어 입력

```
$ sudo apt-get update
$ sudo apt-get install -y gnupg
$ sudo wget https://dev.mysql.com/get/mysql-apt-config_0.8.23-1_all.deb
$ sudo dpkg -i mysql-apt-config_0.8.23-1_all.deb.2
```

#### 2) 호환 가능한 가까운 버전을 선택

![Image](https://github.com/user-attachments/assets/46314e6c-3166-4da5-9447-b713c6161ce2)

- 현재 시스템(Debian Bookworm)은 MySQL이 공식적으로 지원하지 않는 것으로 표시됨.
- 이 경우 호환 가능한 가장 가까운 버전을 선택

#### 3) OK로 넘어가기

- MySQL Server & Cluster (Currently selected: mysql-8.0)으로 표시되어 있다면 키보드 화살표를 통해 Ok를 눌러(Enter) 넘어가기

![Image](https://github.com/user-attachments/assets/8c019e23-ab3c-4fec-9b0c-028117a7b80f)

#### 4) SSH에서 명령어를 입력

```
$ sudo apt update
$ sudo apt-get install -y mysql-server
```

#### 5) MySQL 저장소의 GPG 키 누락 인증 오류

![Image](https://github.com/user-attachments/assets/5afe9fcd-4a8f-465a-bff0-500ff0e98478)

- 해결: MySQL의 GPG 키 가져오기

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B7B3B788A8D3785C
```

#### 6) 비밀번호 설정

![Image](https://github.com/user-attachments/assets/e9ca751e-45c2-45c0-a6ee-1f2467884b5f)

- Use Legacy Authentication Method를 선택
  ![Image](https://github.com/user-attachments/assets/a868afe3-f0b4-4169-9354-097344552bd6)

#### 7) 비밀번호 입력

```
$ sudo mysql -uroot -p
(비밀번호 입력)
(MySQL 프롬프트 접속)
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호';
mysql> exit;
```

#### 8) 소스 코드를 내려받기

```
$ git clone https://github.com/아이디/node-deploy
```

- node-deploy 폴더가 생성

#### 9) 아파치 서버 종료하기

- Lightsail에서는 기본적으로 비트나미 아파치(Bitnami apache) 서버가 켜져있음.
- 하지만 노드 서버와 같이 쓸 수 없으니 아파치 서버를 종료함.

```
$ cd /opt/bitnami
$ sudo ./ctlscript.sh stop apache
Stopped apache
```

![Image](https://github.com/user-attachments/assets/a04ddd2d-70e5-4d17-b3c3-5bf8479821c8)

### 10) npm 설치 후 서버 실행

```
$ cd ~/node-deploy
$ npm ci
$ npx sequelize db:create --env production
$ sudo npm i -g pm2
$ sudo NODE_ENV=production PORT=80 pm2 start server.js -i 0
```
![Image](https://github.com/user-attachments/assets/f4fbbd1c-6ef4-471b-8437-6495ab6a7e73)

## 오류 해결
- 포트를 8001로 명시적으로 설정
- lightsail 방화벽에서 8001 포트를 열어두었음.
- 서버가 외부 IPv4(0.0.0.0)에서 들어오는 연결을 수락하도록 설정하였음.
    - `0.0.0.0/0`으로 입력해야 Any IPv4가 됨.
![Image](https://github.com/user-attachments/assets/51ccf14e-11aa-47c8-bddd-d637038c1eba)

![Image](https://github.com/user-attachments/assets/5aa5d544-71c6-413e-8055-5ce91f68213e)

![Image](https://github.com/user-attachments/assets/652ab2d7-5159-48ea-ac6b-bb6dee9ba6d1)