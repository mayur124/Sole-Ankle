import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = getShoeVariant(salePrice, releaseDate);
  const shoeLabel = getShoeLabel(variant);
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {
          shoeLabel != null ? (
            <ShoeLabel
              style={{
                "--shoe-label-bg-color":
                  variant === "new-release" ? COLORS.secondary : COLORS.primary,
              }}
            >
              {shoeLabel}
            </ShoeLabel>
          ) : undefined
        }
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={salePrice != null}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice ? (<SalePrice>{formatPrice(salePrice)}</SalePrice>) : undefined}
        </Row>
      </Wrapper>
    </Link >
  );
};

const getShoeVariant = (salePrice, releaseDate) =>
  typeof salePrice === "number"
    ? "on-sale"
    : isNewShoe(releaseDate)
      ? "new-release"
      : "default";

const getShoeLabel = (variant) => {
  if (variant === "default") {
    return null;
  }
  if (variant === "on-sale") {
    return "Sale";
  }
  if (variant === "new-release") {
    return "Just Released";
  }
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${props => props.isOnSale ? COLORS.gray[700] : COLORS.gray[900]};
  text-decoration: ${props => props.isOnSale ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const ShoeLabel = styled.span`
  display: inline-block;
  padding: 9px;
  border-radius: 2px;
  background-color: var(--shoe-label-bg-color);
  color: ${COLORS.white};
  position: absolute;
  z-index: 1;
  right: -4px;
  top: 12px;
`;

export default ShoeCard;
