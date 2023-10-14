
import ProgressProvider from "@/lib/progressProvider"
import styled from 'styled-components';

const Tag = styled.div`
    background-color: #d8d8d8;
    height: 30px;
    width: auto;
    transition: all 3s ease;
`

const RankBar = styled.div`
    height: 100%;
    width: ${props => props.width}%;
    transition: all 3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TagName = styled.h4`
    margin-left: 1rem;
    position: relative;
    z-index: 5;
    &::before {
		--scale: 0;
		--arrow-size: 10px;
		--tooltip-color: #333;
		position: absolute;
		top: -.25rem;
		left: 150%;
		transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
		transition: 150ms transform;
		transform-origin: bottom center;
		--translate-y: calc(-100% - var(--arrow-size));
		content: attr(data-tooltip);
		color: white;
		padding: .5rem;
		border-radius: .3rem;
		text-align: center;
		width: max-content;
		max-width: 300px;
		white-space: normal;
		background: var(--tooltip-color);
	}
	&::after {
		--scale: 0;
		--arrow-size: 10px;
		--tooltip-color: #333;
		position: absolute;
		top: -.25rem;
		left: 50%;
		transform: translateX(-50%) translateY(var(--translate-y, 0)) scale(var(--scale));
		transition: 150ms transform;
		transform-origin: bottom center;
		--translate-y: calc(-1 * var(--arrow-size));
		content: '';
		border: var(--arrow-size) solid transparent;
		border-top-color: $border-top-color_1;
		transform-origin: top center;
		white-space: normal;
	}
	&:hover {
		&::before {
			--scale: 1;
		}
		&::after {
			--scale: 1;
		}
	}
`

const TagSection = ({ tagsData }) => {


    const scoreColor = (score) => {
        switch (true) {
            case (score <= 10):
                return 'rgba(232, 189, 249, .05)'
            case (score <= 20):
                return 'rgba(232, 189, 249, .15)'
            case (score <= 30):
                return 'rgba(232, 189, 249, .25)'
            case (score <= 40):
                return 'rgba(232, 189, 249, .35)'
            case (score <= 50):
                return 'rgba(232, 189, 249, .45)'
            case (score <= 60):
                return 'rgba(232, 189, 249, .55)'
            case (score <= 70):
                return 'rgba(232, 189, 249, .65)'
            case (score <= 80):
                return 'rgba(232, 189, 249, .75)'
            case (score <= 90):
                return 'rgba(232, 189, 249, .85)'
            case (score <= 99):
                return 'rgba(232, 189, 252, 1)'
            case (score >= 100):
                return '#19C630'
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 relative gap-1 pt-2 transition-all w-full">
            {tagsData.map((tag, index) => {
                return (
                    <ProgressProvider
                    key={`${tag.name}-${index}`}
                        valueStart={0} valueEnd={tag.rank}>
                        {(value) =>
                            <Tag>
                                <RankBar
                                    width={value}
                                    className="bg-purple-400">
                                    <TagName
                                        data-tooltip={`${tag.description}`}
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {tag.name} ({tag.rank}%)
                                    </TagName>
                                </RankBar>
                            </Tag>}
                    </ProgressProvider>
                )
            })}
        </div>
    )
}

export default TagSection;