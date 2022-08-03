import React from "react";
import PictureCard from "./picture/picture.jsx";
import DescriptionCard from "./descriptionCard/description.jsx";
import DataCard from "./data/data.jsx";
import { Card, Section } from "./styledComponentCard.jsx";

const RecipeCard = () => {
  return (
    <Section>
      <Card>
        <PictureCard name="crêpe"></PictureCard>
        <DescriptionCard
          name="Les Crêpes"
          rating="note: 4/5"
          descTitle="Descriptif:"
          texte="Découvrez cette recette facile de crêpes très rapide à préparer. Une recette simple qui, grâce à sa quantité d'oeufs, ne nécessite aucun repos de la pâte. À préparer à la Chandeleur, pour un brunch ou à tout moment que l'envie vous prend.Découvrez cette recette facile de crêpes très rapide à préparer. Une recette simple qui, grâce à sa quantité d'oeufs, ne nécessite aucun repos de la pâte. À préparer à la Chandeleur, pour un brunch ou à tout moment que l'envie vous prend."
        ></DescriptionCard>
        <DataCard
          title="Réactions:"
          category1="😍"
          category2="🤢"
          category3="🤔"
          category4="🤣"
          category5="🤤"
        ></DataCard>
      </Card>
    </Section>
  );
};

export default RecipeCard;
