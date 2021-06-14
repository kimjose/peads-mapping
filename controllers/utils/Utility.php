<?php


namespace controllers\utils;


use Box\Spout\Common\Entity\Style\CellAlignment;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;

class Utility
{
    public function __construct()
    {
    }

    /***
     *Builds an excel sheet for downloading
     * @param String $name The name of the file to be built
     * @param string[] $headers The headers of the sheet
     * @param string[] $attributes The attributes contained in the data
     * @param array $data An Array containing the data to be loaded in the excel
     *
     * Note The length of these arrays i.e. $headers, $attributes and $data should be the same
     *
     */
    public static function buildExcel($name, $headers, $attributes, $data)
    {
        try {
            if (sizeof($headers)  != sizeof($attributes))
                throw new \Exception("Invalid Data Passed", -1);

            $writer = WriterEntityFactory::createXLSXWriter();
            $writer->openToFile($name);


            $boldRowStyle = (new StyleBuilder())
                ->setFontBold()
                ->setFontSize(12)
                ->setFontUnderline()
                ->setCellAlignment(CellAlignment::CENTER)
                ->build();

            $normalRowStyle = (new StyleBuilder())
                ->setFontSize(10)
                ->setCellAlignment(CellAlignment::CENTER)
                ->build();

            $headerCells = [];
            for ($i = 0; $i < sizeof($headers); $i++){
                $header = $headers[$i];
                array_push($headerCells, WriterEntityFactory::createCell($header));
            }
            $headerRow = WriterEntityFactory::createRow($headerCells, $boldRowStyle);
            $writer->addRow($headerRow);
            foreach ($data as $datum){
                if (sizeof($datum) != sizeof($attributes))
                    throw new \Exception("Attributes mismatch. " . $i, -1);
                $datumCells = [];
                for ($i = 0; $i < sizeof($datum); $i++){
                    $m = WriterEntityFactory::createCell($datum[$attributes[$i]]);
                    array_push($datumCells, $m);
                }
                $writer->addRow(WriterEntityFactory::createRow($datumCells, $normalRowStyle));
            }
            $writer->openToBrowser($name);
            $writer->close();
            unlink($name);

        }catch (\Throwable $e){
            logError($e->getCode(), $e->getMessage());
            echo $e->getMessage();
        }
    }

}