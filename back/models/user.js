module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", { //MySQL에는 users 테이블 생성
        //사용자 정보
        //id는 고유한값이라 mysql에서 자동으로 넣어준다.
        email: {
            type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, //필수
            unique: true, //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        password: {
            type: DataTypes.STRING(100), //패스워드는 암호화때문
            allowNull: false, //필수
        },
    }, {
    charset:'utf8',
    collate:'utf8_general_ci', //한글저장
    });
    //테이블간의 관계는 associate에 적는다(join)
    User.associate = (db) => {};

    return User;
}