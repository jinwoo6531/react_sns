module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", { //MySQL에는 users 테이블 생성
        //사용자 정보
        //id는 고유한값이라 mysql에서 자동으로 넣어준다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    }, {
    charset:'utf8',
    collate:'utf8_general_ci', //한글저장
    });
    Image.associate = (db) => {};

    return Image;
}