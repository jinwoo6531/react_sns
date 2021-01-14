module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define("Hashtag", { //MySQL에는 users 테이블 생성
        //사용자 정보
        //id는 고유한값이라 mysql에서 자동으로 넣어준다.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
    charset:'utf8',
    collate:'utf8_general_ci', //한글저장
    });
    Hashtag.associate = (db) => {};

    return Hashtag;
}