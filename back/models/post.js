module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", { //MySQL에는 users 테이블 생성
        //id는 고유한값이라 mysql에서 자동으로 넣어준다.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci', //한글저장
    });
    Post.associate = (db) => {};

    return Post;
}