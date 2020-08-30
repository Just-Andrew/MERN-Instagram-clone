import React from 'react'
import styles from './Posts.module.css'

export const Posts = props => {
    const images = [
        'https://southafricatoday.net/wp-content/uploads/2019/08/a20350bb4184d4d2ada0251304bfacad.jpg',

        'https://st2.depositphotos.com/1035837/8479/i/950/depositphotos_84798240-stock-photo-galaxy-stars-abstract-space-background.jpg',

        'https://decorco.ru/wp-content/uploads/2018/07/space_11.jpg',

        'https://naked-science.ru/wp-content/uploads/2016/04/article_IC410-SHO_pughCrop.jpg',

        'https://yt3.ggpht.com/a/AATXAJzXHkB51LC-1dYu9bjIdQTvKk_yDy8d0ZIP7g=s900-c-k-c0xffffffff-no-rj-mo',

        'https://decorco.ru/wp-content/uploads/2018/07/space_11.jpg',

        'https://naked-science.ru/wp-content/uploads/2016/04/article_IC410-SHO_pughCrop.jpg',

        'https://yt3.ggpht.com/a/AATXAJzXHkB51LC-1dYu9bjIdQTvKk_yDy8d0ZIP7g=s900-c-k-c0xffffffff-no-rj-mo'
    ]

    let key = 0
    const posts = images.map(i => {
        const cardBG = {
            background: `url(${i}) no-repeat center`,
            backgroundSize: "cover",
        }
        key += 1
        return (
            <div className={styles.postCard} style={cardBG} key={key}>
                <div className={styles.postInfo}>
                    ❤ 3k
                </div>
            </div>
        )
    })

    /* creating rows | 1 row = 3 posts  */
    while (posts.length % 3 !== 0) {
        posts.push(<div className={styles.postCard} ></div>)
    }
    const rows = []
    const rowsAmount = Math.ceil(posts.length / 3)
    for (let k = 1; k <= rowsAmount; k++) {
        rows[k - 1] =
            <div className={styles.row} key={k}>
                {posts[k * 3 - 3]}
                {posts[k * 3 - 2] && posts[k * 3 - 2]}
                {posts[k * 3 - 1] && posts[k * 3 - 1]}
            </div>
    }
    return (
        <div className={styles.postsWrapper}>
            {rows}
        </div>
    )
}