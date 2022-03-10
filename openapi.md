# 开放平台标准接口

| **版本号** | **版本**** ( ****更改**** ) ****说明** | **更改日期** | **更改人员** |
| --- | --- | --- | --- |
| --- | --- | --- | --- |
| V.1.4.2 | 1:用户api下面 2 3，返回是否是管理员字段 IsAdmin2：基础数据，获取学校基本信息为：获取应用关联的所有学校信息 | 2022-03-09 | 廖林霞 |
| V.1.4.1 | 1：添加用户相关三个接口:用户APi下面(11、12、13)2：完善基础说明 | 2022-03-02 | 廖林霞 |
| V.1.4 | 初始版本 | 2021-11-17 | 杨文祥 |

## 基础说明

开放平台接口v.1.x版本接口，主要提供第三人认证订阅数据进行对接，数据基准为业务标准信息接口，不进行业务组合和拼接复杂数据结构输出，用户需要根据自由业务获取数据备份、数据重组实现自己业务。


### 请求方式

XYTOKEN 、AccountId 参数header中，调用示例如下：

示例1（URL + 接口）：

[http://xxx.com](http://xxx.com/)/{Route}

参数XYTOKEN、AccountId对应添加到Header键值中，键值如下

xytoken : 01db0aea5d8911ecb80900155d14eb27

accountid : 4

备注：

xytoken：找运维人员或者对接人员获取

accountid： 可查询接口 [获取学校基本信息](#%E8%8E%B7%E5%8F%96%E5%AD%A6%E6%A0%A1%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF)

参数说明：

| 参数 | 类型 | 是否必填 | 最大长度 | 说明 |
| --- | --- | --- | --- | --- |
| Route | string | 是 | | 接口路由、详细看Api路由地址 |
| XYTOKEN | string | 是 | 64 | 用户订阅注册生成 |
| AccountId | short | 是 | | accountId 站点标识accountId |

实战图例:
![实战图例](image/li1.png)


### 请求响应

请求响应对接失败会以http通用状态返回，开发平台结果数据响应格式在http status = 200下返回结果（结果以json形式返回），示例如下：

响应数据格式：{ &quot;data&quot;: {JsonData}, &quot;success&quot;: true|false,&quot;errorCode&quot;: &quot;string&quot;,&quot;msg&quot;: &quot;string&quot;}

成功数据：{ &quot;data&quot;: {JsonData}, &quot;success&quot;: true}

失败数据：{ &quot;success&quot;: false,&quot;errorCode&quot;: &quot;string&quot;,&quot;msg&quot;: &quot;string&quot;}

| 参数 | 类型 | 是否必填 | 说明 | 示例 |
| --- | --- | --- | --- | --- |
| success | string | 是 | 接口调用状态 | ture:成功 false:失败 |
| errorCode | string | 否 | 业务错误code码 | v1.X暂无详细code |
| msg | string | 否 | 接口调用错误信息 | 业务错误描述 |
| data | object | 否 | 接口返回结果 | 参见具体的API接口文档 |

注：data参数对象具体参考api接口响应参数项


### 接口相关说明

文档接口描述分为三个部分请求地址、请求参数、响应参数

1. 请求地址 - 请求方式（POST）| 请求路由地址（Route）
2. 请求参数 - 请求方式为POST时，以json格式传入body
3. 响应参数 - 模型数据 | 返回数据格式 返回数据格式List集合数据、PageList（模型参考如下示例）分页集合数据

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| TotalRecords | int | 数据总条数 |
| TotalPages | int | 总页数 |
| Data | List<model> | 模型数据集合 |

文档参数类型参照mysql数据库存储类型为基准，参数类型后带有&quot;(?)&quot;代表此参数数据可为空，在请求参数标注时，此参数可为空，其无特殊描述，及为查询该条件全部（为了兼容系统版本，此参数为0也可为全部）

文档中响应参数带有 &quot;#{模型名}&quot; 即相同模型，此处作为一个跳转引用


## 二、用户Api

### 1、用户

#### 学生异动状态

1. POST | api/platform/user/GetUserStaus
2. 请求参数 - No
3. 响应参数 UserStatusInfo | List<UserStatusInfo >

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserStateID | int | 学生异动状态标识Id |
| UserStateName | string | 学生异动状态名称 |
| Type | tinyint | 0：教师学生都可以使用，1：学生，2：教师 |


#### 获取教师集合

1. POST | api/platform/user/GetTeachers
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| PageIndex | int | 第几页 |
| PageSize | int | 每页数量 |

3. 响应参数 <span id="teacher" >TeacherInfo</span>  | PageList<TeacherInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserId | int | 教师Id |
| UserName | string | 登录名 |
| GloblUserID | varchar | - |
| SchoolCardNumber | varchar | 工号 |
| FullName | varchar | 姓名 |
| UserNumberTypeID | tinyint | 1:身份证 2:护照 |
| UserNumber | varchar | 证件号 |
| Sex | bit | 1：男：0：女 |
| BirthDate | string | 出生年月 |
| Icon | varchar | 头像 |
| Address | varchar | 户籍地址 |
| PhoneNumber | varchar | 手机号 |
| EmailAddress | varchar | 电子邮件 |
| NativePlace | varchar | 籍贯 |
| RegionID | int | 籍贯Id(标准籍贯code id) |
| CardNumber | string | 一卡通 |
| IsAdmin | boolean | 是否是管理员，true管理员， false 非管理员 |

#### 根据ids获取教师信息集合

1. POST | api/platform/user/GetTeacherByIds
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 教师Id集合 |

1. 响应参数 [TeacherInfo](#teacher)  | List<TeacherInfo>

#### 获取学生集合

1. POST | api/platform/user/GetStudents
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| PageIndex | int | 第几页 |
| PageSize | int | 每页数量 |
| EnrollmentYear | int | 入学年份 |
| SchoolDistrictID | int | 所属校区 |
| StudentGradeID | int | 教育阶段 |

3. 响应参数 <span id= "StudentInfo" >StudentInfo</span>  | PageList<StudentInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserId | int | 学生Id |
| UserName | string | 登录名 |
| GloblUserID | varchar | - |
| SchoolCardNumber | varchar | 学籍号 |
| FullName | varchar | 姓名 |
| UserNumberTypeID | tinyint | 1:身份证 2:护照 |
| UserNumber | varchar | 证件号 |
| Sex | bit | 1:男 0:女 |
| BirthDate | string | 出生年月 |
| Icon | varchar | 头像 |
| Address | varchar | 户籍地址 |
| PhoneNumber | varchar | 手机号 |
| EmailAddress | varchar | 电子邮件 |
| NativePlace | varchar | 籍贯 |
| RegionID | int | 籍贯Id(标准籍贯code id) |
| CardNumber | varchar | 一卡号 |
| EnrollmentYear | int | 入学年份 |
| SchoolDistrictID | int | 所属校区 |
| StudentGradeID | int | 教育阶段 |
| AdmissionDate | string | 入学时间 |
| ExpirationDate | string | 毕业时间 |
| UserStateID | int | 用户状态 正常、休学…… |

#### 根据ids获取学生信息集合

1. POST | api/platform/user/GetStudentByIds
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int | 学生id集合 |

1. 响应参数 [StudentInfo](#StudentInfo) | List<StudentInfo>

#### 获取学生异动集合

1. POST | api/platform/user/GetStudentStudyStatus

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int | 异动状态UserStateID 集合 |

2. 响应参数 [StudentInfo](#StudentInfo) | List<StudentInfo>

#### 获取家长集合

1. POST | api/platform/user/GetGenearchs
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| PageIndex | int | 第几页 |
| PageSize | int | 每页数量 |

3. 响应参数 <span id="GenearchInfo">GenearchInfo</span>  | PageList<GenearchInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserId | int | 家长Id |
| UserName | string | 登录名 |
| GloblUserID | varchar | - |
| FullName | varchar | 姓名 |
| UserNumberTypeID | tinyint | 1:身份证 2:护照 |
| UserNumber | varchar | 证件号 |
| Sex | bit | 1:男 0:女 |
| BirthDate | string | 出生年月 |
| Icon | varchar | 头像 |
| Address | varchar | 户籍地址 |
| PhoneNumber | varchar | 手机号 |
| EmailAddress | varchar | 电子邮件 |
| NativePlace | varchar | 籍贯 |
| RegionID | int | 籍贯Id(标准籍贯code id) |

#### 根据ids获取家长信息集合

1. POST | api/platform/user/GetGenearchByIds
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 家长id集合 |

1. 响应参数 [GenearchInfo](#GenearchInfo) | List<GenearchInfo>

#### 获取民族信息集合

1. POST | api/platform/user/GetEthnicGroups

1. 请求参数 - No
2. 响应参数 EthnicGroupInfo | List<EthnicGroupInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| EthnicGroupID | int | 标识Id |
| EthnicGroupName | int | 民族名称 |

#### 根据卡号获取用户信息

1. POST | api/platform/user/GetStudentsByCardNumber

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| CardNumber | varchar | 卡号 |

2. 响应参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserId | int | 用户Id |
| UserName | string | 登录名 |
| GloblUserID | varchar | - |
| FullName | varchar | 姓名 |
| UserNumberTypeID | tinyint | 1:身份证 2:护照 |
| UserNumber | varchar | 证件号 |
| Sex | bit | 1:男 0:女 |
| BirthDate | string | 出生年月 |
| Icon | varchar | 头像 |
| Address | varchar | 户籍地址 |
| PhoneNumber | varchar | 手机号 |
| EmailAddress | varchar | 电子邮件 |
| NativePlace | varchar | 籍贯 |
| RegionID | int | 籍贯Id(标准籍贯code id) |
| CardNumber | varchar | 一卡号 |
| EnrollmentYear | int | 入学年份 |
| SchoolDistrictID | int | 所属校区 |
| StudentGradeID | int | 教育阶段 |
| AdmissionDate | string | 入学时间 |
| ExpirationDate | string | 毕业时间 |
| UserStateID | int | 用户状态 正常、休学…… |
 |
 |

#### 根据学生Id集合获取家长信息

1. POST | api/platform/user/GetParentInfoByStudentIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 学生id集合 |

1. 响应参数 [GenearchInfo](#GenearchInfo) +StudentID 学生id | List<GenearchInfo>

#### 根据家长Id集合获取学生信息

1. POST | api/platform/user/GetStudentInfoByParentIds
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 家长id集合 |

3. 响应参数 [StudentInfo](#StudentInfo) +ParentID 家长id | List<StudentInfo+ParentID>

#### 根据班级Id集合获取班主任信息

1. POST | api/platform/user/GetHeadMasterInfoByStudentOrgIds
2. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 班级id集合 |

3. 响应参数 [[TeacherInfo](#teacher) + StudentOrganizationID 班级id | List<TeacherInfo+StudentOrganizationID >


### 2、职务

#### 获取教师职务集合

1. POST | api/platform/User/GetDutys

1. 请求参数 - No
2. 响应参数 <span id="DutInfo">DutyInfo</span> | List<DutyInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| DutyId | int | 职务Id |
| DutyName | varchar | 职务名称 |
| DutyCode | varchar | 职务code |
| LastModifyByDate | string | 最后更新时间 |

#### 根据ids获取职务集合

1. POST | api/platform/user/GetDutyByIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 职务id集合 |

1. 响应参数 [DutyInfo](#DutInfo)| List<DutyInfo>

#### 获取教师职务成员

1. POST | api/platform/user/GetDutyMemberIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 职务Id |

2. 响应参数 List<int>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserID | int | 用户Id(教师) |

#### 根据职务id获取教师管理范围

1. POST | api/platform/user/GetRangeForTeacher

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 职务Id |

2. 响应参数 List<int>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserID | int | 用户Id(教师) |
| OrganizationID | int | 组织id |
| ParentID | int | 父节点id |
| SchoolDistrictID | int | 学校id |


###3、 组织

#### 获取教师组织集合

1. POST | api/platform/user/GetTeacherOrgs

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| ParentID | int | 组织ID null :全部 0：顶级组织 |

2. 响应参数 TeacherOrgInfo | List<TeacherOrgInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| OrganizationID | int | 教师组织标识Id |
| OrganizationName | varchar | 教师组织名称 |
| OrganizationType | char | 组织类型：O行政组织 M教师组织 |
| ParentID | int | 组织所属上级组织ID |
| SchoolDistrictID | int | 所属校区Id |
| Description | varchar | 描述 |
| LastModifyByDate | string | 最后更新时间 |

#### 获取教师组织成员集合

1. POST | api/platform/user/GetTeacherMemberIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| ParentID | int | 组织ID |
| OrganizationID | int | 所属教师组织Id |

2. 响应参数 List<int>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| UserID | int | 用户Id（教师） |

#### 根据教师id获取所在教师组织

1. POST | api/platform/user/GetTeacherOrgByMemberId

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 用户Id（教师） |

2. 响应参数 TeacherOrgInfo | List<TeacherOrgInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| OrganizationID | int | 教师组织标识Id |
| OrganizationName | varchar | 教师组织名称 |
| OrganizationType | char | 组织类型：O行政组织 M教师组织 |
| ParentID | int | 组织所属上级组织ID |
| SchoolDistrictID | int | 所属校区Id |
| Description | varchar | 描述 |
| LastModifyByDate | string | 最后更新时间 |


## 三、基础数据


### 1、学校

#### 获取学校基本信息

注意：此接口查询应用关联的所有学校， header的accountid 可不传。

1. POST | api/platform/basis/GetAccounts
2. 请求参数- No
3. 响应参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| AccountId | int | accountId |
| AccountName | string | 站点名称 |
| AccountNumber | string | 站点编号 |

### 2、校区

#### 获取学校下的所有校区

1. POST | api/platform/basis/GetSchoolDistricts

1. 请求参数 - No
2. 响应参数 <span id= "SchoolDistrictInfo">SchoolDistrictInfo</span> | List<SchoolDistrictInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SchoolDistrictID | int | 校区ID |
| SchoolDistrictName | string | 校区名称 |
| SchoolDistrictFullName | string | 校区全称 |
| LastModifyByDate | string | 数据修改时间 |
| |  |  |

#### 根据校区ID获取校区详情

1. POST | api/platform/basis/GetSchoolDistrictById

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 校区ID |

2. 响应参数 [SchoolDistrictInfo](#SchoolDistrictInfo) | List<SchoolDistrictInfo>


### 3、学年、学期

#### 根据学年获取学期数据

1. POST | api/platform/basis/GetAcademicSessionByYearId

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 学年ID |

2. 响应参数 <span id="AcademicYearInfo">AcademicYearInfo</span>  | List<AcademicSessionInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| AcademicSessionID | int | 学期ID |
| AcademicSessionName | string | 学期名称 |
| AcademicYearID | int | 学年ID |
| StartDate | string | 学期开始时间 |
| EndDate | string | 学期结束时间 |
| LastModifyByDate | string | 数据修改时间 |

#### 获取站点下的所有学年数据

1. POST | api/platform/basis/GetAcademicYears

1. 请求参数 - No
2. 响应参数 AcademicYearInfo| List<AcademicYearInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| AcademicYearID | int | 学年ID |
| AcademicYearName | string | 学年名称 |
| StartDate | int | 学年开始时间 |
| EndDate | string | 学年结束时间 |
| LastModifyByDate | string | 数据修改时间 |

#### 根据学年ids获取学年数据

1. POST | api/platform/basis/GetAcademicYearByIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 学年ID集合 |

2. 响应参数 [AcademicYearInfo](#AcademicYearInfo) | List<AcademicYearInfo>

### 假期

#### 获取所有假期数据

1. POST | api/platform/basis/GetHolidays

1. 请求参数 - No
2. 响应参数 <span id="HolidayInfo">HolidayInfo</span> | List<HolidayInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| HolidayID | int | 假期ID |
| HolidayName | string | 假期名称 |
| Type | int | 类型 |
| HolidayDate | string | 日期 |
| AcademicSessionID | int | 所属学期 |
| LastModifyDate | string | 数据修改时间 |

#### 获取学期下的所有假期

1. POST | api/platform/basis/GetHolidayBySessionId

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 学期ID |

2. 响应参数 [HolidayInfo](#HolidayInfo)| List<HolidayInfo>


### 学级

#### 获取学级集合

1. POST | api/platform/basis/GetStudentYears

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SchoolDistrictID | int | 校区id |

2. 响应参数 StudentYearInfo | List<StudentYearInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentYearID | int | 标识学级Id |
| StudentYearName | varchar | 学级名称 |
| StudentYear | int | 学年Id |
| SchoolDistrictID | Int | 校区id |


### 行政班

#### 获取行政班行政班集合

1. POST | api/platform/basis/GetStudentOrganizations

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SchoolDistrictID | int | 校区Id |
| StudentYearID | int | 学年Id |
| StudentGradeID | int | 学届Id |
| StudentGradeForStudentYearID | int | 学级学习阶段关系ID |
| PageIndex | int | 第几页 |
| PageSize | int | 每页数量 |

2. 响应参数 StudentOrgInfo | PageList<StudentOrgInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentOrganizationID | int | 标识行政班Id |
| SchoolDistrictID | int | 校区Id |
| StudentYearID | int | 学年Id |
| StudentGradeID | int | 学届Id |
| FullName | varchar | 行政班全称(yyyy级小学X班) |
| StudentOrganizationName | varchar | 班级名(X班) |
| ISEffective | bit | 是有有效 |
| LastModifyByDate | string | 最后更新时间 |
| StudentGradeForStudentYearID | int | 学级学习阶段关系ID |

#### 获取行政班学生集合

1. POST | api/platform/basis/GetStudentOrgMembersIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 行政班Id |

2. 响应参数 List<int>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentID | int | 学生Id |

#### 根据学生id获取所属班级信息

1. POST | api/platform/basis/GetStudentOrganizationByUserId

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 用户id（学生id） |

2. 响应参数 StudentOrgInfo | PageList<StudentOrgInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentOrganizationID | int | 标识行政班Id |
| SchoolDistrictID | int | 校区Id |
| StudentYearID | int | 学年Id |
| StudentGradeID | int | 学届Id |
| StudentGradeForStudentYearID | int | 学级学习阶段关系ID |
| FullName | varchar | 行政班全称(yyyy级小学X班) |
| StudentOrganizationName | varchar | 班级名(X班) |
| ISEffective | bit | 是有有效 |
| LastModifyByDate | string | 最后更新时间 |


### 教学楼

#### 获取所有教学楼数据

1. POST | api/platform/basis/GetBuildings

1. 请求参数 - No
2. 响应参数 <span id="BuildingInfo">BuildingInfo</span>  | List<BuildingInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| BuildingID | int | 教学楼ID |
| BuildingName | string | 教学楼名称 |
| BuildingFullName | string | 教学楼全称 |
| SchoolDistrictID | int | 校区ID |
| State | int | 启用状态 |
| AboveGroundCount | int | 地上楼层 |
| UnderGroundCount | int | 地下楼层 |
| LastModifyByDate | string | 数据修改时间 |
| BuildingTypeIDs | int[] | 类型ID集合 |

#### 根据校区获取校区下的教学楼数据

1. POST | api/platform/basis/GetBuildingByDistrictId

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Id | int | 校区ID |

2. 响应参数 [BuildingInfo](#BuildingInfo) | List<BuildingInfo>

#### 获取所有教学楼类型数据

1. POST | api/platform/basis/GetBuildingTypes

1. 请求参数 - No
2. 响应参数 BuildingTypeInfo | List<BuildingTypeInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| BuildingTypeID | int | 类型ID |
| BuildingTypeName | string | 类型名称 |
| LastModifyByDate | string | 数据修改时间 |


### 教室

#### 获取教室数据

1. POST | api/platform/basis/GetHouses

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SchoolDistrictID | int | 校区ID |
| BuildingID | int | 教学楼ID |
| PageIndex | int | 第几页 |
| PageSize | int | 每页数量 |

2. 响应参数 HouseInfo | PageList<HouseInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| HouseID | int | 教室ID |
| Housename | string | 教室名称 |
| HouseFullName | string | 教室全称 |
| Housenumber | string | 教室编号 |
| HousetypeID | int | 教室类型ID |
| Volume | int | 容纳人数 |
| SchoolDistrictID | int | 校区ID |
| BuildingID | int | 教学楼ID |
| Floor | int | 楼层 |
| State | int | 状态 |
| LastModifyByDate | string | 数据修改时间 |

#### 获取所有教室类型数据

1. POST | api/platform/basis/GetHouseTypes

1. 请求参数 - No
2. 响应参数 HouseTypeInfo | List<HouseTypeInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| HousetypeID | int | 教室类型ID |
| HousetypeName | string | 教室类型名称 |
| HouseTypeCode | string | 教室类型code |
| LastModifyByDate | string | 数据修改时间 |


### 学习阶段

#### 获取所有学习阶段

1. POST | api/platform/basis/GetStudentGrades

1. 请求参数 - No
2. 响应参数 StudentGradeInfo | List<StudentGradeInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentGradeID | int | 学习阶段ID |
| StudentGradeName | string | 学习阶段名称 |
| ShowYearCount | int | 学年制 |

#### 获取学级阶段、学级全部关系数据

1. POST | api/platform/basis/GetStudentGradeRelations

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentGradeID | int(?) | 学习阶段ID |
| StudentYearID | int(?) | 学级ID |
| SchoolDistrictID | int(?) | 校区ID |
| ISGraduation | bit(?) | 是否已毕业 |

2. 响应参数 StudentGradeRelInfo | List<StudentGradeRelInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| StudentGradeForStudentYearID | int | 主键ID |
| StudentGradeNameForStudentYearName | string | 关联名称 |
| StudentGradeID | int | 学习阶段ID |
| StudentYearID | int | 学级ID |
| StudentYearName | string | 学级名称 |
| StudentGradeName | string | 学习阶段名称 |
| SchoolDistrictID | int | 校区ID |

## 四、课程

### 1、学科

#### 获取所有学科数据

1. POST | api/platform/course/GetDisciplines

1. 请求参数 - No
2. 响应参数 <span id="DisciplineInfo">DisciplineInfo</span> | List<DisciplineInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| DisciplineID | int | 学科ID |
| DisciplineName | string | 学科名称 |
| XYCode | string | 学科code |
| IsDefault | int | 是否默认0否 1是 |
| LastModifyByDate | string | 数据修改时间 |

#### 根据学科ids获取学科数据

1. POST | api/platform/course/GetDisciplineByIds

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| Ids | int[] | 学科ID集合 |

2. 响应参数 [DisciplineInfo](#DisciplineInfo) | List<DisciplineInfo>


### 课程

#### 获取所有课程数据

1. POST | api/platform/course/GetSubjects

1. 请求参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| DisciplineID | int | 学科ID |

2. 响应参数 SubjectInfo | List<SubjectInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SubjectID | int | 课程ID |
| SubjectName | string | 课程名称 |
| SubjectFullName | string | 课程全称 |
| DisciplineID | int | 学科ID |
| SubjectType | int | 课程类型 |
| SubjectCategoryID | int | 课程类别 |
| SubjectCode | string | 课程code |
| LastModifyByDate | string | 数据修改时间 |

#### 获取所有课程分类数据

1. POST | api/platform/course/GetSubjectCategorys

1. 请求参数 - No
2. 响应参数 SubjectCategoryInfo | List<SubjectCategoryInfo>

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| SubjectCategoryID | int | 分类ID |
| SubjectCategoryName | string | 分类名称 |
| SubjectCategoryType | int | 课程分类(一般配合PID使用,例如:PID为3的，都是校本子分类)[{&quot;1&quot;:&quot;国家课程&quot;},{&quot;2&quot;:&quot;地方课程&quot;},{&quot;3&quot;:&quot;校本课程&quot;}] |
| PID | int | 父级ID |
| LastModifyByDate | string | 数据修改时间 |